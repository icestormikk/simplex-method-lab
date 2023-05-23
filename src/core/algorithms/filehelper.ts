import * as fs from "fs";
import * as readline from "readline";
import {Equation} from "@/core/domain/math/classes/Equation";
import {allElementsAreZero, getLongestLineInMatrix} from "@/core/algorithms/arrayhelper";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";

export async function readFileAsSimplexEntities(
    filepath: string
) {
    const lines: Array<string> = []
    const fileStream = fs.createReadStream(filepath)
    const readLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of readLine) {
        lines.push(line)
    }

    return convertDataToSimplexEntities(lines)
}

export async function writeToFile(
    source: {target: TargetFunction, constraints: Array<Equation>},
    filepath: string
) {
    const result: {message: string | undefined} = {message: undefined}
    const targetAsString = source.target
        .func.coefficients.map((coefficient) => coefficient.multiplier)
        .concat(source.target.func.constant)
        .join(' ')
    const constraintsAsString = source.constraints
        .map((constraint) => {
            return constraint
                .polynomial.coefficients.map((coefficient) => coefficient.multiplier)
                .concat(constraint.value)
                .join(' ')
        })
        .join('\n')

    fs.writeFile(filepath, targetAsString + '\n' + constraintsAsString, {},(err) => {
        if (err) {
            result.message = `Error while saving: ${err}`
        }
        return undefined
    })

    return result
}

function convertDataToSimplexEntities(
    lines: Array<string>
) {
    const rawMatrix = lines.map((line) => line.split(/\s+/ig))

    const updatedMatrix: Array<Array<number>> = []
    rawMatrix.forEach((line) => {
        const updatedRow: Array<number> = []

        line.forEach((el) => {
            const updatedElement = Number(el)
            if (updatedElement !== Number.NaN) {
                updatedRow.push(updatedElement)
            }
        })

        if (updatedRow.length > 0) {
            updatedMatrix.push(updatedRow)
        }
    })

    const minLength = getLongestLineInMatrix(updatedMatrix).length
    const target = convertIntoTargetFunction(minLength, updatedMatrix[0])

    updatedMatrix.splice(0, 1)
    const constraints = convertIntoEquations(minLength, updatedMatrix)

    console.log({target, constraints})
    return {target, constraints}
}


function convertIntoEquations(
    minLength: number, multipliers: Array<Array<number>>
) : Array<Equation> {
    const equations: Array<Equation> = []

    for (const multiplierLine of multipliers) {
        if (allElementsAreZero(multiplierLine)) {
            continue
        }

        const coefficients = Array(minLength).fill(0)
        multiplierLine.forEach((el, index) => {
            coefficients[index] = el
        })
        const constant = coefficients.pop()
        equations.push(
            new Equation(
                Polynomial.fromNumbersArray(coefficients),
                constant
            )
        )
    }

    return equations
}

function convertIntoTargetFunction(
    minLength: number, numbers: Array<number>
) : TargetFunction {
    const updatedArray = Array(minLength).fill(0)
    numbers.forEach((el, index) => {
        updatedArray[index] = el
    })

    const constant = updatedArray.pop()
    return new TargetFunction(
        Polynomial.fromNumbersArray(updatedArray, constant),
        ExtremumType.MINIMUM
    )
}
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {deleteColumnByIndex} from "@/core/algorithms/arrayhelper";
import {extractCoefficients, getCopyTargetFunction, passDefaultSimplexMethod} from "@/core/algorithms/simplex";
import {Rational} from "@/core/domain/math/classes/Rational";

function passArtificialSimplexMethod(simplex: SimplexMatrix, additionalCoefficientIndexes: Array<number>) {
    while (!isArtificialSolution(simplex)) {
        const cols = simplex.findPossibleBearingColumns()
        let element;

        try {
            element = simplex.findBearingElement(cols)
            console.log(element)
            if (!element) {
                throw new Error('Bearing element is undefined!')
            }
        } catch (e: any) {
            throw new Error(`Cant find the bearing element: ${e.message}`)
        }

        simplex = simplex.makeStep(element)
        deleteUnnecessaryColumnsFrom(simplex, additionalCoefficientIndexes)
    }
    return simplex;
}

export function artificialBasisMethod(
    target: TargetFunction,
    constraints: Array<Equation>
) {
    if (!isConstraintsSuitable(constraints)) {
        throw new Error('Constraints are not suitable!')
    }

    const additionalCoefficientIndexes = createAdditionalIndexesArray(
        constraints.length,
        constraints[
            findIndexLongestConstraints(constraints)
        ].polynomial.coefficients.length
    )
    const allIndexes = [...Array(
        constraints[0].polynomial.coefficients.length + additionalCoefficientIndexes.length
    ).keys()]
    const copiedTargetFunction = getCopyTargetFunction(target)

    for (let i = 0; i < constraints.length; i++) {
        constraints[i].polynomial.coefficients.push(
            new Coefficient(1, additionalCoefficientIndexes[i])
        )
    }

    let simplex = SimplexMatrix.fromMathObjects(
        new TargetFunction(
            new Polynomial(
                allIndexes.map((el) => new Coefficient(0, el))
            ),
            ExtremumType.MINIMUM
        ),
        constraints, allIndexes,
        allIndexes.filter((el) => additionalCoefficientIndexes.includes(el))
    )
    fillLastMatrixRow(simplex.coefficientsMatrix);

    simplex = passArtificialSimplexMethod(simplex, additionalCoefficientIndexes);
    simplex.coefficientsMatrix.pop()

    const newEquations = convertToEquations(simplex.rows, simplex.columns, simplex.coefficientsMatrix)
    newEquations.forEach((eq) => {
        const index = eq.polynomial.coefficients[0].index;
        const solved = eq.solveByCoefficient(index)

        target.func.replaceCoefficientByIndex(index, solved)
    })

    simplex.coefficientsMatrix.push(
        target.func.coefficients.map((el, index) =>
            el.multiplier * (index === simplex.coefficientsMatrix.length - 1 ? -1 : 1)
        )
    )
    const lastMatrixRowIndex = simplex.coefficientsMatrix.length - 1
    simplex.coefficientsMatrix[lastMatrixRowIndex].push(target.func.constant * (-1))

    simplex = passDefaultSimplexMethod(simplex)

    const coefficients = extractCoefficients(simplex)
    const result = copiedTargetFunction.func.getValueIn(...coefficients.map((el) => el.multiplier))
    console.log(copiedTargetFunction.func.toString())
    console.log(
        'x: (' + coefficients.map((el) => `${el.multiplier}`).join(', ') + ')'
    )
    console.log(`f(x): ${result}`)
}

function isArtificialSolution(simplexMatrix: SimplexMatrix) : boolean {
    const lastMatrixRowIndex = simplexMatrix.coefficientsMatrix.length - 1
    simplexMatrix.coefficientsMatrix.forEach((array) => {
        console.log(array.map((el) => Rational.fromNumber(el).toString()).join(', '))
    })

    for (let i = 0; i < simplexMatrix.coefficientsMatrix[lastMatrixRowIndex].length; i++) {
        if (simplexMatrix.coefficientsMatrix[lastMatrixRowIndex][i] !== 0) {
            return false
        }
    }

    return true
}

function convertToEquations(
    rows: Array<number>,
    columns: Array<number>,
    coefficients: Matrix<number>
) {
    const result: Array<Equation> = []

    coefficients.forEach((line, index) => {
        const lastColumnIndex = line.length - 1

        const eq = new Equation(
            new Polynomial([new Coefficient(1, rows[index])]),
            line[lastColumnIndex]
        )
        for (let i = 0; i < lastColumnIndex; i++) {
            eq.polynomial.coefficients.push(
                new Coefficient(line[i], columns[i])
            )
        }
        result.push(eq)
    })

    return result
}

function deleteUnnecessaryColumnsFrom(
    source: SimplexMatrix, additionalCoefficientIndexes: Array<number>
) {
    source.columns.forEach((column, index) => {
        if (additionalCoefficientIndexes.includes(column)) {
            source.columns.splice(index, 1)
            deleteColumnByIndex(source.coefficientsMatrix, index)
        }
    })
}

function isConstraintsSuitable(constraints: Array<Equation>) : boolean {
    for (const constraint of constraints) {
        if (constraint.value < 0) {
            return false
        }
    }

    return true
}

function findIndexLongestConstraints(constraints: Array<Equation>) : number {
    let result = 0
    for (let i = 0; i < constraints.length; i++) {
        if (constraints[i].polynomial.coefficients.length > result) {
            result = i
        }
    }

    return result
}

function createAdditionalIndexesArray(
    constraintsCount: number, startIndex: number
) : Array<number> {
    const result: Array<number> = []
    for (let i = 0; i < constraintsCount; i++) {
        result.push(startIndex + i)
    }

    return result
}

function fillLastMatrixRow(
    coefficientsMatrix: Matrix<number>
) {
    const lastRowIndex = coefficientsMatrix.length - 1

    for (let i = 0; i < coefficientsMatrix[0].length; i++) {
        let sum = 0
        for (let j = 0; j < coefficientsMatrix.length; j++) {
            sum += coefficientsMatrix[j][i]
        }
        coefficientsMatrix[lastRowIndex][i] = sum * (sum ? -1 : 1)
    }
}

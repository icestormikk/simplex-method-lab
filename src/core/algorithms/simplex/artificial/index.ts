import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {deleteColumnByIndex} from "@/core/algorithms/arrayhelper";
import {Rational} from "@/core/domain/math/classes/Rational";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {passDefaultSimplexMethod} from "@/core/algorithms/simplex";

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
        console.log(simplex)
        deleteUnnecessaryColumnsFrom(simplex, additionalCoefficientIndexes)
    }
    return simplex;
}

export function artificialBasisMethod(
    target: TargetFunction,
    constraints: Array<Equation>
) {
    validateArguments(target, constraints)
    const appendedCoefficients = appendCoefficients(constraints)
    const allIndexes = [...Array(appendedCoefficients[appendedCoefficients.length - 1].index + 1).keys()]

    let simplex = SimplexMatrix.fromMathObjects(
        target, constraints, allIndexes,
        appendedCoefficients.map((el) => el.index)
    )
    fillSimplexMatrixLastRow(simplex.coefficientsMatrix)

    simplex = passArtificialSimplexMethod(simplex, appendedCoefficients.map((el) => el.index))
    const updatedSimplex = passToDefaultSimplex(target, simplex)
    const result = passDefaultSimplexMethod(updatedSimplex)
    result.coefficientsMatrix.forEach((array) => {
        console.log(array.map((el) => Rational.fromNumber(el).toString()).join(', '))
    })
}

function validateArguments(
    target: TargetFunction,
    constraints: Array<Equation>
) {
    if (target.extremumType === ExtremumType.MAXIMUM) {
        target.reverse()
    }

    for (const constraint of constraints) {
        if (constraint.value < 0) {
            constraint.polynomial.coefficients.forEach((coefficient) => {
                coefficient.multiplier *= -1
            })
            constraint.value *= -1
        }
    }
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

function passToDefaultSimplex(
    target: TargetFunction,
    simplex: SimplexMatrix
) {
    simplex.coefficientsMatrix.pop()
    const newEquations = convertToEquations(simplex.rows, simplex.columns, simplex.coefficientsMatrix)

    newEquations.forEach((equation) => {
        const index = equation.polynomial.coefficients[0].index;
        const solved = equation.solveByCoefficient(index)
        target.func.replaceCoefficientByIndex(index, solved)
    })

    console.log(target.toString())
    return SimplexMatrix.fromMathObjects(
        target, newEquations, simplex.columns, simplex.rows
    )
}

function convertToEquations(
    rows: Array<number>,
    columns: Array<number>,
    coefficients: Matrix<number>
) : Array<Equation> {
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

function appendCoefficients(constraints: Array<Equation>) : Array<Coefficient> {
    function findLongestConstraint(source: Array<Equation>) : Equation {
        let result = source[0]
        for (const equation of source) {
            if (result.polynomial.coefficients.length < equation.polynomial.coefficients.length) {
                result = equation
            }
        }
        return result
    }

    const addedCoefficients: Array<Coefficient> = []
    const startIndex = findLongestConstraint(constraints).polynomial.coefficients.length
    constraints.forEach((constraint, index) => {
        const newCoefficient = new Coefficient(1, startIndex + index)
        constraint.polynomial.coefficients.push(newCoefficient)
        addedCoefficients.push(newCoefficient)
    })

    return addedCoefficients
}

function fillSimplexMatrixLastRow(
    source: Matrix<number>
) {
    const lastRowIndex = source.length - 1

    for (let i = 0; i < source[lastRowIndex].length; i++) {
        let sum = 0
        for (let j = 0; j < source.length - 1; j++) {
            sum += source[j][i]
        }
        source[lastRowIndex][i] = sum * (sum ? -1 : 1)
    }
}

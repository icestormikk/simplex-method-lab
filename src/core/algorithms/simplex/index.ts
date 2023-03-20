import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import gauss from "@/core/algorithms/gauss";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {store} from "@/redux/store";
import {addStep} from "@/redux/slices/SimplexState";
import {copyTwoDimensionalArray} from "@/core/algorithms/arrayhelper";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";

function appendSimplexStep(simplexMatrix: SimplexMatrix, bearingElement: MatrixElement) {
    if (bearingElement.rowIndex === undefined || bearingElement.columnIndex === undefined) {
        console.warn('Can\'t add a reference element with an undefined column or row index')
        return
    }

    store.dispatch(
        addStep({
            simplexSnapshot: new SimplexMatrix(
                [...simplexMatrix.rows],
                [...simplexMatrix.columns],
                copyTwoDimensionalArray(simplexMatrix.coefficientsMatrix)
            ),
            bearingElement: {
                row: bearingElement.rowIndex,
                column: bearingElement.columnIndex
            }
        })
    )
}

export function simplexMethod(
    targetFunction: TargetFunction,
    constraints: Array<Equation>,
    selectedColumnIndexes: Array<number>
) {
    if (targetFunction.extremumType === ExtremumType.MAXIMUM) {
        targetFunction.reverse()
    }

    const allColumnIndexes = [...Array(targetFunction.func.coefficients.length).keys()]
    const copyTF = getCopyTargetFunction(targetFunction)

    let validatedSelectedColumns: Array<number>
    try {
        validatedSelectedColumns = validateColumnsArray(selectedColumnIndexes, allColumnIndexes)
    } catch (e: any) {
        throw new Error(`Error while validating of columns: ${e.message}`)
    }

    const matrixConstraints = Equation.toMatrix(constraints)
    gauss(matrixConstraints, validatedSelectedColumns)
    const equations = Equation.fromMatrix(matrixConstraints)

    console.log(targetFunction.toString())
    equations.forEach((eq, index) => {
        const column = validatedSelectedColumns[index];
        console.log(eq.toString())
        const solved = eq.solveByCoefficient(column)

        console.log(solved.toString())
        targetFunction.func.replaceCoefficientByIndex(column, solved)
    })
    console.log(targetFunction.toString())

    let simplexMatrix = SimplexMatrix.fromMathObjects(
        targetFunction, equations, allColumnIndexes, selectedColumnIndexes
    )

    while (!isSolution(simplexMatrix)) {
        console.log(simplexMatrix)
        const cols = simplexMatrix.findPossibleBearingColumns()
        let element

        try {
            element = simplexMatrix.findBearingElement(cols)
            if (!element) {
                throw new Error('Bearing element is undefined!')
            }
        } catch (e: any) {
            throw new Error(`Cant find the bearing element: ${e.message}`)
        }
        appendSimplexStep(simplexMatrix, element);

        console.log(element)
        console.log(simplexMatrix.rows, simplexMatrix.columns)

        simplexMatrix = simplexMatrix.makeStep(element!)
    }
    appendSimplexStep(simplexMatrix, {columnIndex: -1, multiplier: -1, rowIndex: -1});

    console.log(simplexMatrix)
    const coefficients = extractCoefficients(simplexMatrix)
    const result = copyTF.func.getValueIn(...coefficients.map((el) => el.multiplier))
    console.log(
        'x: (' + coefficients.map((el) => `${el.multiplier}`).join(', ') + ')'
    )
    console.log(`f(x): ${result}`)
}

function isSolution(simplexMatrix: SimplexMatrix) : boolean {
    const lastRowIndex = simplexMatrix.coefficientsMatrix.length - 1

    for (let i = 0; i < simplexMatrix.coefficientsMatrix[lastRowIndex].length - 1; i++) {
        const element = simplexMatrix.coefficientsMatrix[lastRowIndex][i]
        if (element < 0) {
            return false
        }
    }

    return true
}

function extractCoefficients(simplexMatrix: SimplexMatrix) : Array<Coefficient> {
    const {rows, columns, coefficientsMatrix} = simplexMatrix
    const coefficients: Array<number> = Array(rows.length + columns.length).fill(0)
    const lastColumnIndex = coefficientsMatrix[0].length - 1

    rows.forEach((rowIndex, index) => {
        coefficients[rowIndex] = coefficientsMatrix[index][lastColumnIndex]
    })

    return coefficients.map((el, index) => new Coefficient(el, index))
}

function getCopyTargetFunction(source: TargetFunction) : TargetFunction {
    const {func, extremumType} = source
    const {coefficients, constant} = func
    const newCoefficients = coefficients.map((el) => new Coefficient(el.multiplier, el.index))
    const newPolynomial = new Polynomial([...newCoefficients], constant)

    return new TargetFunction(newPolynomial, extremumType)
}

function validateColumnsArray(array: Array<number>, allIndexesArray: Array<number>) {
    const result: Array<number> = []

    array.forEach((element) => {
        if (element >= 0 && allIndexesArray.includes(element)) {
            result.push(element)
        }
    })

    if (result.length === 0) {
        throw new Error('No suitable column indexes were found')
    }

    return result
}

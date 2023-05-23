import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import gauss from "@/core/algorithms/gauss";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {store} from "@/redux/store";
import {addStep, setResult} from "@/redux/slices/SimplexState";
import {copyTwoDimensionalArray} from "@/core/algorithms/arrayhelper";
import {EMPTY_MATRIX_ELEMENT, MatrixElement} from "@/core/domain/math/aliases/MatrixElement";
import * as Tags from "@/core/domain/math/enums/SimplexStepTag";

export function appendSimplexStep(
    isArtificialStep: boolean = false,
    target: TargetFunction,
    simplexMatrix: SimplexMatrix,
    bearingElement: MatrixElement,
    possibleElements: Array<MatrixElement> = [],
    appendedCoefficientIndexes?: Array<number>,
    content?: { calculations?: Array<string>, tags?: Array<Tags.SimplexStepTag> }
) {
    if (bearingElement.rowIndex === undefined || bearingElement.columnIndex === undefined) {
        console.warn('Can\'t add a reference element with an undefined column or row index')
        return
    }

    store.dispatch(
        addStep({
            id: store.getState().simplex.steps.length,
            isArtificialBasisStep: isArtificialStep,
            target: target.copy(),
            appendedCoefficientIndexes,
            simplexSnapshot: new SimplexMatrix(
                [...simplexMatrix.rows],
                [...simplexMatrix.columns],
                copyTwoDimensionalArray(simplexMatrix.coefficientsMatrix)
            ),
            bearingElement,
            possibleBearingElements: possibleElements,
            additionalContent: {
                calculations: content?.calculations || [],
                tags: content?.tags || []
            }
        })
    )
}

export async function simplexMethod(
    targetFunction: TargetFunction,
    constraints: Array<Equation>,
    selectedColumnIndexes: Array<number>,
) {
    if (targetFunction.extremumType === ExtremumType.MAXIMUM) {
        targetFunction.reverse()
    }

    const allColumnIndexes = [...Array(targetFunction.func.coefficients.length).keys()]
    const copyTF = targetFunction.copy()

    let validatedSelectedColumns: Array<number>
    try {
        validatedSelectedColumns = validateColumnsArray(selectedColumnIndexes, allColumnIndexes)
    } catch (e: any) {
        store.dispatch(
            setResult(undefined)
        )
        throw new Error(`Error while validating of columns: ${e.message}`)
    }

    const matrixConstraints = Equation.toMatrix(constraints)
    try {
        gauss(matrixConstraints, validatedSelectedColumns)
    } catch (e: any) {
        store.dispatch(
            setResult(undefined)
        )
        appendSimplexStep(false,
            copyTF,
            new SimplexMatrix([],[], []),
            EMPTY_MATRIX_ELEMENT,
            undefined,
            undefined,
            {
                tags: [new Tags.HasErrorTag("Ошибка при определении базиса")]
            }
        )
        throw new Error(e.message)
    }
    const equations = Equation.fromMatrix(matrixConstraints)

    equations.forEach((eq, index) => {
        const column = validatedSelectedColumns[index];
        const solved = eq.solveByCoefficient(column)
        copyTF.func.replaceCoefficientByIndex(column, solved)
    })

    let simplexMatrix = SimplexMatrix.fromMathObjects(
        targetFunction, equations, allColumnIndexes, selectedColumnIndexes
    )

    await passDefaultSimplexMethod(copyTF, simplexMatrix);
}

export async function passDefaultSimplexMethod(
    target: TargetFunction,
    simplexMatrix: SimplexMatrix,
    firstStepBearingElement?: { element: MatrixElement, possibleElements: Array<MatrixElement> }
) {
    for (;!isSolution(simplexMatrix);) {
        const cols = simplexMatrix.findPossibleBearingColumns()
        let bearingElements

        try {
            bearingElements = firstStepBearingElement || simplexMatrix.findBearingElements(cols)
            if (firstStepBearingElement) {
                firstStepBearingElement = undefined
            }

            if (!bearingElements.element) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error('Bearing element is undefined!')
            }
        } catch (e: any) {
            store.dispatch(
                setResult(undefined)
            )
            appendSimplexStep(
                false,
                target,
                simplexMatrix,
                EMPTY_MATRIX_ELEMENT,
                [],
                undefined,
                {
                    tags: [
                        new Tags.HasErrorTag("Функция не ограничена снизу")
                    ]
                }
            );
            throw new Error(`Cant find the bearing element: ${e.message}`)
        }

        const {newMatrix, calculations} = simplexMatrix.makeStep(bearingElements.element!)
        appendSimplexStep(
            false,
            target,
            simplexMatrix,
            bearingElements.element,
            bearingElements.possibleElements,
            undefined,
            {calculations}
        );
        simplexMatrix = newMatrix;
    }

    appendSimplexStep(
        false,
        target,
        simplexMatrix,
        EMPTY_MATRIX_ELEMENT,
        [],
        [],
        {tags: [new Tags.HasResultTag()]}
    )

    setResult(extractResult(simplexMatrix))
    return simplexMatrix;
}

export function extractCoefficients(simplexMatrix: SimplexMatrix) : Array<Coefficient> {
    const {rows, columns, coefficientsMatrix} = simplexMatrix
    const coefficients: Array<number> = Array(rows.length + columns.length).fill(0)
    const lastColumnIndex = coefficientsMatrix[0].length - 1

    rows.forEach((rowIndex, index) => {
        coefficients[rowIndex] = coefficientsMatrix[index][lastColumnIndex]
    })

    return coefficients.map((el, index) =>
        new Coefficient(el, index)
    )
}

export function extractResult(simplexMatrix: SimplexMatrix) {
    return extractCoefficients(simplexMatrix)
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
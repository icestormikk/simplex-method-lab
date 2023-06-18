import {GaussState} from "./gaussState";
import {Matrix} from "@/core/domain/math/aliases/Matrix";

export let REVERSE_NUMBER_SIGN = false

export default function gauss(
    matrix: Matrix<number>,
    selectedColumns: Array<number> = Array.from(Array(matrix.length).keys()),
    mode: GaussState = GaussState.DIAGONALIZING
) {
    validateInput(selectedColumns, matrix)

    for (const columnIndex of selectedColumns) {
        const i = selectedColumns.indexOf(columnIndex)
        if (matrix[i][columnIndex] === 0) {
            rebuildByMainElement(matrix, i)
        }

        for (let j = matrix.length - 1; j >= 0; j--) {
            if (j === i) {
                continue
            }

            const coefficient = matrix[j][columnIndex] / matrix[i][columnIndex]
            for (let k = 0; k < matrix[j].length; k++) {
                matrix[j][k] -= coefficient * matrix[i][k]
            }
        }
    }

    if (mode === GaussState.TRIANGULATE) {
        return
    }

    for (const columnIndex of selectedColumns) {
        const i = selectedColumns.indexOf(columnIndex)

        const coefficient = matrix[i][columnIndex];
        if (coefficient === 0) { continue }
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[i][j] /= coefficient
        }
    }

    if (mode === GaussState.FULL_TRIANGULATION) {
        return
    }

    for (const columnIndex of immutableReverse(selectedColumns)) {
        console.log(columnIndex)
        const i = selectedColumns.indexOf(columnIndex)
        console.log(i)
        for (let j = 0; j < i; j++) {
            if (matrix[i][columnIndex] === 0) {
                continue
            }

            const coefficient = matrix[j][columnIndex] / matrix[i][columnIndex]
            for (let k = i; k < matrix[0].length; k++) {
                matrix[j][k] -= coefficient * matrix[i][k]
            }
        }
    }
}

function validateInput(
    selectedColumns: Array<number>,
    sourceMatrix: Matrix<number>
) {
    selectedColumns = selectedColumns.splice(
        0, selectedColumns.length, ...new Set(selectedColumns)
    )
    selectedColumns.forEach((el, index) => {
        if (el < 0 || el > sourceMatrix[0].length) {
            selectedColumns.splice(index, 1)
        }
    })

    if (selectedColumns.length !== sourceMatrix.length) {
        console.log(selectedColumns, sourceMatrix)
        throw new Error('Count of selected columns !== source matrix size')
    }
}

function rebuildByMainElement(
    matrix: Matrix<number>,
    selectedRowIndex: number
) {
    let rowMaxIndex = selectedRowIndex
    let maxElement = Number.MIN_VALUE

    for (let i = 0; i < matrix.length; i++) {
        const current = matrix[i][selectedRowIndex]
        if (current !== 0 && Math.abs(current) > maxElement) {
            rowMaxIndex = i; maxElement = Math.abs(current)
        }
    }

    if (rowMaxIndex !== selectedRowIndex) {
        REVERSE_NUMBER_SIGN = !REVERSE_NUMBER_SIGN
        for (let i = 0; i < matrix[0].length; i++) {
            const temporal = matrix[rowMaxIndex][i]
            matrix[rowMaxIndex][i] = matrix[selectedRowIndex][i]
            matrix[selectedRowIndex][i] = temporal
        }
    }

    return matrix
}

function immutableReverse<T>(array: Array<T>) : Array<T> {
    const result: Array<T> = []
    for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i])
    }

    return result
}
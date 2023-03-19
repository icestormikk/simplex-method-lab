import {Matrix} from "@/core/domain/math/aliases/Matrix";

export function buildTwoDimensionalArray<T>(rowCount: number, columnCount: number) : Array<Array<T>> {
    const rows = Array(rowCount)
    for (let i = 0; i < rows.length; i++) {
        rows[i] = Array(columnCount).fill(0)
    }

    return rows
}

export function findFirstNegativeCoefficientIndex(
    simplexMatrix: Matrix<number>
) : number | undefined {
    for (let i = 0; i < simplexMatrix[simplexMatrix.length - 1].length - 1; i++) {
        const value = simplexMatrix[simplexMatrix.length - 1][i]
        if (value < 0) {
            return i
        }
    }

    return undefined
}

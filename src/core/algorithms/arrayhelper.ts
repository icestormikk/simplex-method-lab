import {Matrix} from "@/core/domain/math/aliases/Matrix";

export function buildTwoDimensionalArray<T>(rowCount: number, columnCount: number) : Array<Array<T>> {
    const rows = Array(rowCount)
    for (let i = 0; i < rows.length; i++) {
        rows[i] = Array(columnCount).fill(0)
    }

    return rows
}

export function copyTwoDimensionalArray<T>(source: Matrix<T>) : Matrix<T> {
    const result: Matrix<T> = Array(source.length)

    for (let i = 0; i < source.length; i++) {
        result[i] = [...source[i]]
    }

    return result
}
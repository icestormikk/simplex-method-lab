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

export function deleteColumnByIndex<T>(source: Matrix<T>, index: number) {
    if (index < 0) {
        throw new Error('Index can not be negative!')
    }

    for (let i = 0; i < source.length; i++) {
        if (index >= source[i].length) {
            console.warn(`Can not delete element with index ${index} in line ${i}. It does not exist.`)
            continue
        }
        source[i].splice(index, 1)
    }
}

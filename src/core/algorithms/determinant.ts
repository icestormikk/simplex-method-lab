import gauss, {REVERSE_NUMBER_SIGN} from "./gauss";
import {ROUNDING_ACCURACY} from "@/core/constants";
import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {GaussState} from "@/core/algorithms/gauss/gaussState";


export default function determinant(matrix: Matrix<number>) {
    if (matrix.length !== matrix[0].length) {
        throw new Error('Non square matrix!')
    }

    const copyOfMatrix = copyMatrix(matrix)
    let result = 1.0

    gauss(copyOfMatrix, undefined, GaussState.TRIANGULATE)
    for (let i = 0;  i < matrix.length; i++) {
        result *= copyOfMatrix[i][i]
    }

    return Number((result * (REVERSE_NUMBER_SIGN ? -1 : 1)).toFixed(ROUNDING_ACCURACY))
}

function copyMatrix(source: Matrix<number>) : Matrix<number> {
    let copy: Matrix<number> = new Array(source.length)

    for (let i = 0; i < source.length; i++) {
        copy[i] = source[i].slice(0)
    }

    return copy
}
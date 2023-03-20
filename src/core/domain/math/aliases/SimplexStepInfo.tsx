import {Matrix} from "@/core/domain/math/aliases/Matrix";

export type SimplexStepInfo = {
    coefficients: Matrix<number>,
    bearingElement: {
        row: number,
        column: number
    }
}
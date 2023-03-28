import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {Rational} from "@/core/domain/math/classes/Rational";

export type SimplexStepInfo = {
    coefficients: Matrix<Rational>,
    bearingElement: {
        row: number,
        column: number
    }
}
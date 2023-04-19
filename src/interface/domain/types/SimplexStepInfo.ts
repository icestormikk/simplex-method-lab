import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";


export type SimplexStepInfo<T> = {
    id: number,
    isArtificialBasisStep: boolean,
    target: TargetFunction,
    appendedCoefficientIndexes?: Array<number>,
    simplexSnapshot: SimplexMatrix,
    bearingElement: MatrixElement,
    possibleBearingElements: Array<MatrixElement>,
    additionalContent?: T
}
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";


export type SimplexStepInfo = {
    simplexSnapshot: SimplexMatrix,
    bearingElement: MatrixElement,
    possibleBearingElements: Array<MatrixElement>
}
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import {copyConstraints} from "@/core/algorithms/simplex/artificial";
import gauss from "@/core/algorithms/gauss";
import Polynomial from "@/core/domain/math/classes/Polynomial";

export function graphicalMethod(
    target: TargetFunction,
    constraints: Array<Equation>
) {
    // add some checks ?

    const copiedConstraints = copyConstraints(constraints)
    const copiedTargetFunction = target.copy()
    const constraintsMatrix = Equation.toMatrix(copiedConstraints)
    const selectedColumnIndexes = constraintsMatrix.map((el, index) => index)

    gauss(constraintsMatrix, selectedColumnIndexes)
    const newConstraints = Equation.fromMatrix(constraintsMatrix)
    const constraintsList: Array<Polynomial> = []

    newConstraints.forEach((constraint, index) => {
        const column = selectedColumnIndexes[index]
        const solved = constraint.solveByCoefficient(column)
        constraintsList.push(solved)
        copiedTargetFunction.func.replaceCoefficientByIndex(column, solved)
    })

    return {
        updatedTarget: copiedTargetFunction,
        constraintsList
    }
}
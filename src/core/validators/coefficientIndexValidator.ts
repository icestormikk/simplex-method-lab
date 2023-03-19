import Coefficient from "@/core/domain/math/classes/Coefficient";

export function coefficientValidator(coefficient?: Coefficient) {
    if (!coefficient) {
        throw new Error(`Coefficient does not exist.`)
    }
    if (coefficient.multiplier === 0) {
        throw new Error('Can not solve by coefficient with multiplier that equals zero.')
    }
}
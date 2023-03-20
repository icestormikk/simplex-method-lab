import Polynomial from "@/core/domain/math/classes/Polynomial";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";

export class TargetFunction {
    constructor(
        public func: Polynomial,
        public extremumType: ExtremumType
    ) {}

    reverse() : TargetFunction {
        this.func.coefficients.forEach((el) => el.multiplier *= (-1))
        if (this.extremumType === ExtremumType.MINIMUM) {
            this.extremumType = ExtremumType.MAXIMUM
        } else {
            this.extremumType = ExtremumType.MINIMUM
        }

        return this
    }

    public toString() : string {
        return this.func.toString() + ` -> ${this.extremumType.valueOf()}`
    }
}
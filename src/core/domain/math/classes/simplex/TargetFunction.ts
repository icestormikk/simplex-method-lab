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

    isEmpty() : boolean {
        let result = true
        this.func.coefficients.forEach((coefficient) => {
            if (coefficient.multiplier !== 0) {
                result = false
            }
        })

        if (this.func.constant !== 0) {
            result = false
        }

        return result;
    }

    public toString() : string {
        return this.func.toString() + ` -> ${this.extremumType.valueOf()}`
    }
}
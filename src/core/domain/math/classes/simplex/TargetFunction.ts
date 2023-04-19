import Polynomial from "@/core/domain/math/classes/Polynomial";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import Coefficient from "@/core/domain/math/classes/Coefficient";

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

    copy() : TargetFunction {
        const {func, extremumType} = this
        const {coefficients, constant} = func
        const newCoefficients = coefficients.map((el) => new Coefficient(el.multiplier, el.index))
        const newPolynomial = new Polynomial([...newCoefficients], constant)

        return new TargetFunction(newPolynomial, extremumType)
    }

    public toString() : string {
        return this.func.toString() + ` -> ${this.extremumType.valueOf()}`
    }
}
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";

export class TargetFunction {
    constructor(
        public func: Polynomial,
        public extremumType: ExtremumType
    ) {}

    public toString() : string {
        return this.func.toString() + ` -> ${this.extremumType.valueOf()}`
    }
}
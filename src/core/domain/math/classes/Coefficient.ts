import {Rational} from "@/core/domain/math/classes/Rational";

export default class Coefficient {
    constructor(
        public multiplier: number,
        public index: number
    ) {}

    public toString() : string {
        return `${Rational.fromNumber(this.multiplier)}${this.index !== undefined ? `*x${this.index}` : ''}`
    }
}
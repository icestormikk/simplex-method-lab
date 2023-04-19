import Polynomial from "@/core/domain/math/classes/Polynomial";
import Point from "@/core/domain/math/classes/Point";

export class Inequality {
    constructor(
        readonly polynomial: Polynomial,
        readonly sign: ">=" | ">" | "<=" | "<",
        readonly constant: number
    ) {
    }

    isValid(point: Point): boolean {
        let left = this.polynomial.coefficients
            .map((coefficient) => {
                const coordinate = point.coordinates[coefficient.index];
                if (coordinate === undefined) {
                    return 0
                }
                return coefficient.multiplier * coordinate
            })
            .reduce((a,b) => a + b)
        left += this.polynomial.constant

        return this.calculate(left, this.constant)
    }

    private calculate(left: number, right: number) : boolean {
        console.log('calculate: ' + left + ' ' + right)
        switch (this.sign) {
            case ">=":
                return left >= right
            case ">":
                return left > right
            case "<=":
                return left <= right
            case "<":
                return left < right
            default:
                throw new Error('Unknown inequality operator: ' + this.sign)
        }
    }

    public toString(): string {
        return `${this.polynomial.toString()} ${this.sign} ${this.constant}`
    }
}

import Coefficient from "./Coefficient";
import {coefficientValidator} from "@/core/validators/coefficientIndexValidator";
import {Rational} from "@/core/domain/math/classes/Rational";

// const coefficientsRegex = /(-*\d*[.,]*\d+\*x\d+)|(-*\d+)/ig;
// const numbersRegex = /(-*\d*[.,]*\d+)|(-*\d+)/ig;

export default class Polynomial {
    private coefficients_: Array<Coefficient> = []
    public constant: number = 0

    get coefficients(): Array<Coefficient> {
        return this.coefficients_
    }

    constructor(
        coefficients: Array<Coefficient>,
        constant?: number
    ) {
        coefficients.forEach((coefficient) => {
            this.coefficients_.push(coefficient)
        })
        if (constant !== undefined) {
            this.constant = constant
        }
    }

    static fromNumbersArray(
        coefficients: Array<number>,
        constant?: number
    ) {
        const updatedCoefficients = coefficients.map((el, index) =>
            new Coefficient(el, index)
        )

        return new Polynomial(updatedCoefficients, constant)
    }

    add(polynomial: Polynomial) {
        polynomial.coefficients.forEach((coefficient) => {
            const index = this.coefficients_.findIndex((el) =>
                el.index === coefficient.index
            )

            if (index > -1) {
                this.coefficients_[index].multiplier += coefficient.multiplier
            } else {
                this.coefficients_.push(coefficient)
            }
        })

        this.constant += polynomial.constant
    }

    replaceCoefficientByIndex(index: number, replacement: Polynomial) {
        const copiedReplacement = replacement.copy()
        const suitableCoefficientIndex = this.coefficients_.findIndex((el) =>
            el.index === index
        )

        if (suitableCoefficientIndex === -1) {
            throw new Error(`Index of replacing coefficient does not exist in this polynomial: ${index}, ${replacement.toString()}`)
        }

        copiedReplacement.coefficients.forEach((coefficient) =>
            coefficient.multiplier *= this.coefficients[suitableCoefficientIndex].multiplier
        )
        copiedReplacement.constant *= this.coefficients[suitableCoefficientIndex].multiplier

        this.coefficients_.splice(suitableCoefficientIndex, 1)
        this.add(copiedReplacement)
    }

    private getStyledConstant(isReversed = false): string {
        const updatedConstant = (isReversed ? (-1) : 1) * this.constant
        return updatedConstant !== 0 ? ((updatedConstant > 0 ? "+" : "") + Rational.fromNumber(updatedConstant)) : ''
    }

    solveByCoefficient(index: number): Polynomial {
        const suitableCoefficient = this.coefficients_.find((el) =>
            el.index === index
        )

        coefficientValidator(suitableCoefficient)

        const updatedCoefficients = this.coefficients_.filter((el) =>
            el.index !== index
        ).map((coefficient) =>
            new Coefficient(coefficient.multiplier / suitableCoefficient!.multiplier * (-1), coefficient.index)
        )

        return new Polynomial(updatedCoefficients, this.constant * (-1))
    }

    getValueIn(...multipliers: Array<number>): number {
        if (multipliers.length < this.coefficients.length) {
            console.warn(
                `There are ${this.coefficients.length} variables in the polynomial, but ${multipliers.length} are passed. `
                + 'The remaining variables will be equated to zero.'
            )
        }
        if (multipliers.length > this.coefficients.length) {
            console.warn(
                `There are ${this.coefficients.length} variables in the polynomial, but ${multipliers.length} are passed. `
                + `Only the first ${this.coefficients.length} multipliers will be processed.`
            )
        }

        const fullMultiplierArray = Array(this.coefficients.length).fill(0)
        multipliers.slice(0, this.coefficients.length).forEach((multiplier, index) => {
            fullMultiplierArray[index] = multiplier
        })

        let result = 0;
        fullMultiplierArray.forEach((multiplier, index) => {
            result += multiplier * this.coefficients[index].multiplier
        })

        return result + this.constant
    }

    public copy(): Polynomial {
        return new Polynomial(
            this.coefficients.map((el) =>
                new Coefficient(el.multiplier, el.index)
            ),
            this.constant
        )
    }

    public toString(): string {
        const withoutConstant = this.coefficients_
            .filter((coefficient) => coefficient.multiplier !== 0)
            .map((coefficient, index) =>
                (index > 0 && coefficient.multiplier >= 0 ? '+' : '') + coefficient.toString()
            ).join('')

        return withoutConstant + this.getStyledConstant()
    }
}
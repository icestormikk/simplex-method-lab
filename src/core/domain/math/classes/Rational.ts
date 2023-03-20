export class Rational {
    constructor(
        public numerator: number,
        public denominator: number
    ) {}

    static fromNumber(value: number) : Rational {
        const maxDenominator = 10000
        let bestRational = {
            numerator: 1,
            denominator: 1,
            error: Math.abs(value - 1)
        }

        for (let denominator = 1; bestRational.error > 0 && denominator < maxDenominator; denominator++) {
            const numerator = Math.round(value * denominator)
            const currentError = Math.abs(value - numerator / denominator)

            if (currentError >= bestRational.error) {
                continue
            }

            bestRational.numerator = numerator
            bestRational.denominator = denominator
            bestRational.error = currentError
        }

        return new Rational(bestRational.numerator, bestRational.denominator)
    }

    toNumber() : number {
        return this.numerator / this.denominator
    }

    public toString() : string {
        return `${this.numerator}` + (this.denominator !== 1 ? `/${this.denominator}` : ``)
    }
}
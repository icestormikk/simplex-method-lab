import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {coefficientValidator} from "@/core/validators/coefficientIndexValidator";
import {buildTwoDimensionalArray} from "@/core/algorithms/arrayhelper";
import Coefficient from "@/core/domain/math/classes/Coefficient";

export class Equation {
    constructor(
        public polynomial: Polynomial,
        public value: number
    ) {}

    static fromMatrix(matrix: Matrix<number>) : Array<Equation> {
        const result: Array<Equation> = []

        for (let i = 0; i < matrix.length; i++) {
            const coefficients = matrix[i].slice(0, matrix[i].length - 1)
            const constant = matrix[i][matrix[i].length - 1]
            const polynomial = Polynomial.fromNumbersArray(coefficients)

            result.push(new Equation(polynomial, constant))
        }

        return result
    }

    static toMatrix(equations: Array<Equation>) : Matrix<number> {
        const result = buildTwoDimensionalArray<number>(
            equations.length,
            equations[0].polynomial.coefficients.length + 1
        )

        equations.forEach((equation, eqIndex) => {
            equation.polynomial.coefficients.forEach((coefficient, index) => {
                result[eqIndex][index] = coefficient.multiplier
            })
            result[eqIndex][result[eqIndex].length - 1] = equation.value
        })

        return result
    }

    solveByCoefficient(index: number) : Polynomial {
        const suitableCoefficient = this.polynomial.coefficients.find((el) =>
            el.index === index
        )

        coefficientValidator(suitableCoefficient)

        return new Polynomial(this.polynomial.coefficients, this.polynomial.constant - this.value)
            .solveByCoefficient(index)
    }

    copy() : Equation {
        const copiedCoefficients = this.polynomial.coefficients.map((coefficient) =>
            new Coefficient(coefficient.multiplier, coefficient.index)
        )

        return new Equation(
            new Polynomial(copiedCoefficients, this.polynomial.constant),
            this.value
        )
    }

    public toString() : string {
        return this.polynomial.toString() + ` = ${this.value}`
    }
}
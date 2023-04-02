import {Matrix} from "@/core/domain/math/aliases/Matrix";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {Equation} from "@/core/domain/math/classes/Equation";
import {buildTwoDimensionalArray} from "@/core/algorithms/arrayhelper";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";
import {ROUNDING_ACCURACY} from "@/core/constants";
import {normalize} from "@/core/algorithms/numberhelper";
import {Rational} from "@/core/domain/math/classes/Rational";

function getCalculationsString(source: Array<number>, bearingElement: MatrixElement) {
    return '(' + source.map((el, elIndex) =>
        elIndex === bearingElement.columnIndex ? '*' : `${Rational.fromNumber(el)}`
    ).join(', ') + ')';
}

export default class SimplexMatrix {

    constructor(
        public rows: Array<number>,
        public columns: Array<number>,
        public coefficientsMatrix: Matrix<number>
    ) {}

    static fromMathObjects(
        target: TargetFunction,
        constraints: Array<Equation>,
        coefficientIndexes: Array<number>,
        selectedCoefficientIndexes: Array<number>
    ) {
        const rows = selectedCoefficientIndexes
        const columns = coefficientIndexes.filter((el) => !selectedCoefficientIndexes.includes(el))
        const result: Array<Array<number>> = Array(rows.length + 1)
        const lastRowIndex = result.length - 1;

        constraints.forEach((constraint, eqIndex) => {
            result[eqIndex] = []
            columns.forEach((column) => {
                const coefficient = constraint.polynomial.coefficients.find((el) =>
                    el.index === column
                )
                result[eqIndex].push(coefficient ? coefficient.multiplier : 0)
            })
            result[eqIndex].push(constraint.value)
        })

        result[lastRowIndex] = []
        columns.forEach((column) => {
            const coefficient = target.func.coefficients.find((el) =>
                el.index === column
            )
            if (coefficient) {
                result[lastRowIndex].push(coefficient ? coefficient.multiplier : 0)
            }
        })
        result[lastRowIndex].push(
            target.func.constant ? target.func.constant * (-1) : 0
        )

        return new SimplexMatrix(rows, columns, result)
    }

    private isFunctionLimited(
        possibleBearingColumns: Array<MatrixElement>
    ) : boolean {
        for (const column of possibleBearingColumns) {
            let isAllNotPositive = true
            if (column.columnIndex === undefined) {
                continue
            }

            for (let i = 0; i < this.coefficientsMatrix.length; i++) {
                if (this.coefficientsMatrix[i][column.columnIndex] > 0) {
                    isAllNotPositive = false
                }
            }

            if (isAllNotPositive) {
                return false
            }
        }

        return true
    }

    private isSafe(
        possibleBearingColumns: Array<MatrixElement>
    ) {
        if (!this.isFunctionLimited(possibleBearingColumns)) {
            throw new Error('The function is not limited')
        }
    }

    private static fillBearingRow(
        source: Matrix<number>, target: Matrix<number>, element: MatrixElement
    ) {
        for (let i = 0; i < target[element.rowIndex!].length; i++) {
            if (i === element.columnIndex) {
                continue
            }
            target[element.rowIndex!][i] = normalize(1.0 / element.multiplier *
                source[element.rowIndex!][i])
        }
    }

    private static fullBearingColumn(
        source: Matrix<number>, target: Matrix<number>, element: MatrixElement
    ) {
        for (let i = 0; i < target.length; i++) {
            if (i === element.rowIndex) {
                continue
            }
            target[i][element.columnIndex!] = normalize(-1.0 / element.multiplier *
                source[i][element.columnIndex!])
        }
    }

    private static fullNonBearingRows(
        source: Matrix<number>, target: Matrix<number>, element: MatrixElement
    ) : Array<string> {
        const content: Array<string> = []

        for (let i = 0; i < target.length; i++) {
            if (i === element.rowIndex) {
                continue
            }

            const calculationsString = getCalculationsString(source[i], element).concat(
                ((-1) * source[i][element.columnIndex!] >= 0 ? '+' : '') + `${
                    Rational.fromNumber((-1) * source[i][element.columnIndex!])
                }*${
                    getCalculationsString(target[element.rowIndex!], element)
                }`
            )

            for (let j = 0; j < target[i].length; j++) {
                if (j === element.columnIndex) {
                    continue
                }

                target[i][j] = normalize(source[i][j] - source[i][element.columnIndex!]
                    * target[element.rowIndex!][j])
            }
            const resultCS = calculationsString.concat(' = ' + getCalculationsString(target[i], element))
            content.push(resultCS)
        }

        return content
    }

    findPossibleBearingColumns() : Array<MatrixElement> {
        // function findAbsoluteMaximum(source: Array<MatrixElement>) : MatrixElement {
        //     let max = source[0]
        //     source.forEach((element) => {
        //         const value = Math.abs(element.multiplier);
        //         if (value > Math.abs(max.multiplier)) {
        //             max = element
        //         }
        //     })
        //
        //     return max
        // }

        const result: Array<MatrixElement> = []
        const lastRowIndex = this.coefficientsMatrix.length - 1

        for (let i = 0; i < this.coefficientsMatrix[lastRowIndex].length - 1; i++) {
            const element = this.coefficientsMatrix[lastRowIndex][i]
            if (element < 0) {
                result.push({multiplier: element, columnIndex: i})
            }
        }

        return result
    }

    findBearingElements(
        possibleBearingColumns: Array<MatrixElement>
    ) : {element: MatrixElement | undefined, possibleElements: Array<MatrixElement>} {
        this.isSafe(possibleBearingColumns)
        const possibleElements: Array<MatrixElement> = []
        let min: MatrixElement | undefined
        let minDiv = Number.MAX_VALUE

        for (const column of possibleBearingColumns) {
            for (let i = 0; i < this.coefficientsMatrix.length; i++) {
                if (column.columnIndex === undefined) {
                    continue
                }
                const element = this.coefficientsMatrix[i][column.columnIndex]
                if (element < 0) {
                    continue
                }

                const div = this.coefficientsMatrix[i][this.coefficientsMatrix[i].length - 1] / element
                const elementAsObject = {multiplier: element, rowIndex: i, columnIndex: column.columnIndex}

                possibleElements.push(elementAsObject)
                if (min === undefined || div < minDiv) {
                    minDiv = div
                    min = elementAsObject
                }
            }
        }

        return {element: min, possibleElements}
    }

    makeStep(
        bearingElement: MatrixElement
    ) {
        if (bearingElement.rowIndex === undefined || bearingElement.columnIndex === undefined) {
            throw new Error('Illegal state: row index or column index is undefined')
        }

        const coefficientMatrix = buildTwoDimensionalArray<number>(
            this.coefficientsMatrix.length,
            this.coefficientsMatrix[0].length
        )

        const {rowIndex, columnIndex, multiplier} = bearingElement
        const newRows = [...this.rows], newColumns = [...this.columns]

        let temp = newRows[bearingElement.rowIndex]
        newRows[bearingElement.rowIndex] = newColumns[bearingElement.columnIndex]
        newColumns[bearingElement.columnIndex] = temp

        coefficientMatrix[rowIndex][columnIndex] = +(1.0 / multiplier).toFixed(ROUNDING_ACCURACY)
        SimplexMatrix.fillBearingRow(
            this.coefficientsMatrix, coefficientMatrix, bearingElement
        )
        SimplexMatrix.fullBearingColumn(
            this.coefficientsMatrix, coefficientMatrix, bearingElement
        )
        const additionalContent = SimplexMatrix.fullNonBearingRows(
            this.coefficientsMatrix, coefficientMatrix, bearingElement
        )

        return {
            newMatrix : new SimplexMatrix(newRows, newColumns, coefficientMatrix),
            calculations: additionalContent
        }
    }
}
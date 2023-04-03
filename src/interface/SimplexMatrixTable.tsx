import React from 'react';
import {Rational} from "@/core/domain/math/classes/Rational";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";

interface SimpleMatrixTableProps<T> {
    matrix: SimplexMatrix,
    selectedElement: MatrixElement,
    possibleBearingElements: Array<MatrixElement>,
    setPickedElement?: React.Dispatch<React.SetStateAction<MatrixElement>>
}

function SimplexMatrixTable(
    {matrix, selectedElement, possibleBearingElements, setPickedElement}: SimpleMatrixTableProps<number>
) {

    const isPossibleElement = (row: number, column: number) => {
        const index = possibleBearingElements.findIndex((el) =>
            el.rowIndex === row && el.columnIndex === column
        )

        return index > -1
    }

    const isSelectedElement = (row: number, column: number) => {
        return selectedElement.rowIndex === row && selectedElement.columnIndex === column
    }

    const handleElementClick = (elementValue: MatrixElement) => {
        if (setPickedElement) {
            setPickedElement(elementValue)
        }
    }

    return (
        <table className="simplex-matrix-table text-2xl">
            <tbody>
                <tr>
                    <td></td>
                    {
                        matrix.columns.map((el, index) => (
                            <td key={index}>{`x${el}`}</td>
                        ))
                    }
                    <td></td>
                </tr>
                {
                    matrix.coefficientsMatrix.map((array, index) => (
                        <tr key={index}>
                            <td>
                                {
                                    index !== matrix.coefficientsMatrix.length -1 ? `x${matrix.rows[index]}` : ''
                                }
                            </td>
                            {
                                array.map((element, elIndex) => (
                                    <td
                                        key={elIndex}
                                        className={(
                                            isSelectedElement(index, elIndex))
                                                ? `bg-bearing-element-color/50` :
                                            (isPossibleElement(index, elIndex)
                                                ? 'bg-possible-bearing-element-color/50' :
                                                'bg-white'
                                            )
                                        }
                                        onClick={() => {
                                            handleElementClick({
                                                rowIndex: index, columnIndex: elIndex, multiplier: element
                                            })
                                        }}
                                    >
                                        {Rational.fromNumber(element).toString()}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default SimplexMatrixTable;
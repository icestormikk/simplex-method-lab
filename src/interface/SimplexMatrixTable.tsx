import React from 'react';
import {Rational} from "@/core/domain/math/classes/Rational";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";

interface SimpleMatrixTableProps<T> {
    matrix: SimplexMatrix,
    selectedElement: {row: number, column: number}
}

function SimplexMatrixTable({matrix, selectedElement}: SimpleMatrixTableProps<number>) {
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
                                        className={(selectedElement.row === index && selectedElement.column === elIndex) ?
                                        'bg-green-500/50' : ''}
                                        onClick={() => {
                                            console.log(element)
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
import React from 'react';
import {Rational} from "@/core/domain/math/classes/Rational";
import HeadersColumns from "@/interface/Menu/constraints/BuilderTable/HeadersColumns";
import {AiOutlineInsertRowBelow, AiOutlineInsertRowRight} from "react-icons/ai";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import {
    MAX_COLUMNS_COUNT,
    MAX_ROWS_COUNT,
    MIN_COLUMNS_COUNT,
    MIN_ROWS_COUNT
} from "@/core/constants";
import Warning from "@/interface/Messages/Warning";
import BuilderTableButton from "@/interface/Menu/constraints/BuilderTable/BuilderTableButton";
import {Equation} from "@/core/domain/math/classes/Equation";
import {fromRationalString} from "@/core/algorithms/numberhelper";

interface CoefficientBuilderTableProps {
    configuration: {
        target: TargetFunction,
        constraints: Array<Equation>
    }
}

function CoefficientsBuilderTable({configuration}: CoefficientBuilderTableProps) {
    const [warning, setWarning] = React.useState<{message?: string}>({message: undefined})
    const [targetFunction, setTargetFunction] = React.useState(configuration.target)
    const [constraintsMatrix, setConstraintsMatrix] = React.useState(configuration.constraints)

    const handleColumnAdding = async () => {
        if (constraintsMatrix[0].polynomial.coefficients.length >= MAX_COLUMNS_COUNT) {
            setWarning({message: 'Превышено максимальное количество столбцов!'})
            return
        }
        setWarning({message: undefined})

        setTargetFunction((prevState) => {
            prevState.func.coefficients.push(
                new Coefficient(0, prevState.func.coefficients.length)
            )
            return prevState
        })
        setConstraintsMatrix((prevState) => {
            prevState.forEach((eq) => {
                eq.polynomial.coefficients.push(
                    new Coefficient(0, eq.polynomial.coefficients.length)
                )
            })

            return prevState
        })
    }
    const handleColumnDeleting = async () => {
        if (constraintsMatrix[0].polynomial.coefficients.length <= MIN_COLUMNS_COUNT) {
            setWarning({message: 'В таблице должен присутствовать минимум 1 столбец'})
            return
        }
        setWarning({message: undefined})

        setTargetFunction((prevState) => {
            prevState.func.coefficients.pop()
            return new TargetFunction(prevState.func, prevState.extremumType)
        })
        setConstraintsMatrix((prevState) => {
            prevState.forEach((eq) => {
                eq.polynomial.coefficients.pop()
            })
            return [...prevState]
        })
    }

    const handleRowAdding = async () => {
        if (constraintsMatrix.length >= MAX_ROWS_COUNT) {
            setWarning({message: 'Превышено максимальное количество строк!'})
            return
        }
        setWarning({message: undefined})

        setConstraintsMatrix((prevState) => {
            const newRow = new Equation(
                Polynomial.fromNumbersArray(
                    Array(prevState[0].polynomial.coefficients.length).fill(0)
                ),
                0
            )
            prevState.push(newRow)
            return prevState
        })
    }
    const handleRowDeleting = async () => {
        if (constraintsMatrix.length === 0) {
            setWarning({message: 'В таблице должно присутствовать минимум одно ограничение!'})
            return
        }
        setWarning({message: undefined})

        setConstraintsMatrix((prevState) => {
            prevState.pop()
            return prevState
        })
    }

    function onChangeTargetCoefficient(value: number, coefficient: Coefficient | number) {
        if (value !== undefined) {
            if (coefficient instanceof Coefficient) {
                coefficient.multiplier = value
            } else {
                targetFunction.func.constant = value
            }
        }
        return coefficient;
    }

    function onChangeConstraintsCoefficient(value: number, element: Coefficient | number, index: number) {
        if (value !== undefined) {
            if (element instanceof Coefficient) {
                element.multiplier = value
            } else {
                constraintsMatrix[index].value = value
            }
        }
        return element
    }

    return (
        <div className="flex justify-start items-start flex-col gap-2 p-2">
            <div
                className="flex justify-start items-start flex-row gap-2"
            >
                <table className="simplex-matrix-table">
                    <tbody>
                    <tr>
                        <td className="titled-cell"></td>
                        <HeadersColumns
                            content={targetFunction.func.coefficients.map((el, index) => index)}
                            elementToString={(el) => `c${el}`}
                        />
                        <td className="titled-cell">c</td>
                    </tr>
                    <tr>
                        <td className="titled-cell">f(x)</td>
                        {
                            [...targetFunction.func.coefficients, targetFunction.func.constant]
                                .map((coefficient, index) => (
                                    <td key={index}>
                                        <input
                                            type="text"
                                            defaultValue={typeof coefficient !== 'number' ? Rational.fromNumber(coefficient.multiplier).toString() : 0}
                                            onChange={(event) => {
                                                const val = event.target.value
                                                let num = Number(val)
                                                if (Rational.isRational(val)) {
                                                    num = fromRationalString(val)
                                                }

                                                coefficient = onChangeTargetCoefficient(num, coefficient);
                                            }}
                                        />
                                    </td>
                                ))
                        }
                    </tr>
                    <tr>
                        <td className="titled-cell"></td>
                        <HeadersColumns
                            content={[...constraintsMatrix[0].polynomial.coefficients.map((el) => el.index), 'b']}
                            elementToString={(el) => typeof el === 'number' ? `a${el}` : 'b'}
                        />
                    </tr>
                    {
                        constraintsMatrix.map((eq, index) => (
                            <tr key={index}>
                                <td className="titled-cell">
                                    {`f${index + 1}(x)`}
                                </td>
                                {
                                    [...eq.polynomial.coefficients, eq.value]
                                        .map((element, elIndex) => (
                                            <td
                                                key={elIndex}
                                            >
                                                <input
                                                    type="text"
                                                    defaultValue={
                                                        element instanceof Coefficient
                                                            ? Rational.fromNumber(element.multiplier).toString()
                                                            : `${element}`
                                                    }
                                                    onChange={(event) => {
                                                        const val = event.target.value;
                                                        let num = Number(val)
                                                        if (Rational.isRational(val)) {
                                                            num = fromRationalString(val)
                                                        }

                                                        element = onChangeConstraintsCoefficient(num, element, index);
                                                    }}
                                                />
                                            </td>
                                        ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="centered flex-col gap-1">
                    <BuilderTableButton
                        icon={<AiOutlineInsertRowRight/>}
                        bgColor="bg-green-600/80"
                        action={() => handleColumnAdding()}
                        blockingCondition={
                            constraintsMatrix[0].polynomial.coefficients.length >= MAX_COLUMNS_COUNT
                        }
                    />
                    <BuilderTableButton
                        icon={<AiOutlineInsertRowRight/>}
                        bgColor="bg-red-600/80"
                        action={() => handleColumnDeleting()}
                        blockingCondition={
                            constraintsMatrix[0].polynomial.coefficients.length <= MIN_COLUMNS_COUNT
                        }
                    />
                </div>
            </div>
            <div className="centered flex-row gap-1">
                <BuilderTableButton
                    icon={<AiOutlineInsertRowBelow/>}
                    bgColor="bg-green-600/80"
                    action={() => handleRowAdding()}
                    blockingCondition={
                        constraintsMatrix.length >= MAX_ROWS_COUNT
                    }
                />
                <BuilderTableButton
                    icon={<AiOutlineInsertRowBelow/>}
                    bgColor="bg-red-600/80"
                    action={() => handleRowDeleting()}
                    blockingCondition={
                        constraintsMatrix.length <= MIN_ROWS_COUNT
                    }
                />
            </div>
            {
                warning.message && (
                    <Warning message={warning.message}/>
                )
            }
        </div>
    );
}

export default CoefficientsBuilderTable;
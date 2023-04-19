import React from 'react';
import {useAppSelector} from "@/redux/hooks";
import {Rational} from "@/core/domain/math/classes/Rational";

interface ResultPanelProps {
    point: Array<number>
}

function ResultPanel(props: ResultPanelProps) {
    const target = useAppSelector((state) => state.main.targetFunction)

    return (
        <div className="bordered rounded-md shadow-md p-2">
            <b>Результат: </b>
            <div className="centered w-max gap-2 px-2 text-md">
                <b>Вычисленная точка: </b>
                <span>
                    {
                        '(' +
                        props.point
                            .map((el) => Rational.fromNumber(el))
                            .join(', ')
                        + ')'
                    }
                </span>
            </div>
            <div className="centered w-max gap-2 px-2">
                <b>Оптимальное решение: </b>
                <span>{`${Rational.fromNumber(target.func.getValueIn(...props.point))}`}</span>
            </div>
        </div>
    );
}

export default ResultPanel;
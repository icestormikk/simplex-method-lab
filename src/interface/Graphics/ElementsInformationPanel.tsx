import React from 'react';
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";

interface ElementsInformationPanelProps {
    inequalities: Array<Inequality>,
    sourceTarget: TargetFunction,
    shortedTarget?: TargetFunction
}

function ElementsInformationPanel(props: ElementsInformationPanelProps) {
    return (
        <div className="graphical-elements-info-block">
            <b>Ограничения: </b>
            {
                props.inequalities.length > 0 ? (
                    props.inequalities.map((ineq, index) => (
                        <span key={index}>
                            {ineq.toString()}
                        </span>
                    ))
                ) : (
                    <span>Не определены</span>
                )
            }
            <b>Исходная целевая функция: </b>
            {
                props.sourceTarget ? (
                    <span>
                        {props.sourceTarget.toString()}
                    </span>
                ) : (
                    <span>Не определена</span>
                )
            }
            <b>Полученная целевая функция: </b>
            {
                props.shortedTarget ? (
                    <span>
                        {props.shortedTarget.toString()}
                    </span>
                ) : (
                    <span>Не определена</span>
                )
            }
        </div>
    );
}

export default ElementsInformationPanel;
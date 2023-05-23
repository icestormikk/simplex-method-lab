import React from 'react';
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import Point from "@/core/domain/math/classes/Point";

interface ElementsInformationPanelProps {
    inequalities: Array<Inequality>,
    sourceTarget: TargetFunction,
    shortedTarget?: TargetFunction,
    result?: {
        point: Point,
        value: number
    }
}

function ElementsInformationPanel(props: ElementsInformationPanelProps) {
    return (
        <div className="graphical-elements-info-block">
            <div>
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
            </div>
            <div>
                <b>Новая целевая функция: </b>
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
            <div>
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
            </div>
        </div>
    );
}

export default ElementsInformationPanel;
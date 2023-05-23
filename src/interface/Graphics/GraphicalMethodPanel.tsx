import React from 'react';
import {graphicalMethod} from "@/core/algorithms/graphical";
import {useAppSelector} from "@/redux/hooks";
import {passPlotStep} from "@/jsxgraph/start";
import ElementsInformationPanel from "@/interface/Graphics/ElementsInformationPanel";
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import Point from "@/core/domain/math/classes/Point";
import {artificialBasisMethod} from "@/core/algorithms/simplex/artificial";
import {extractResult} from "@/core/algorithms/simplex";
import {Rational} from "@/core/domain/math/classes/Rational";
import {setResult} from "@/redux/slices/SimplexState";

function GraphicalMethodPanel() {
    const target = useAppSelector((state) => state.main.targetFunction)
    const constraints = useAppSelector((state) => state.main.constraints)
    const simplexResult = useAppSelector((state) => state.simplex.result)
    const [plotExtremum, setPlotExtremum] = React.useState<Array<number>>([])
    const [configuration, setConfiguration] = React.useState<{
        inequalities: Array<Inequality>,
        shortedTarget?: TargetFunction,
        result?: { point: Point, value: number }
    }>({
        inequalities: [],
        shortedTarget: undefined,
        result: undefined
    })

    const useMethod = async () => {
        const {updatedTarget, constraintsList} = graphicalMethod(target, constraints)
        const inequalities = constraintsList
            .map((polynomial) =>
                new Inequality(polynomial, ">=", 0)
            )

        const result = await artificialBasisMethod(target, constraints)
        setResult(extractResult(result))

        if (!simplexResult) { return }
        const {axisIndexes} = passPlotStep(
            simplexResult,
            updatedTarget,
            inequalities
        )
        setPlotExtremum(
            simplexResult.filter((_, index) =>
                axisIndexes?.includes(index)
            ) || []
        )
        setConfiguration((prevState) => {
            prevState.inequalities = [...inequalities]
            prevState.shortedTarget = updatedTarget
            prevState.result = {
                point: new Point(...simplexResult!),
                value: target.func.getValueIn(...simplexResult)
            }

            return {...prevState}
        })
    }

    return (
        <div className="w-full h-full centered">
            <div className="centered w-max flex-col h-full p-2 bordered shadow-md">
                <div className="flex justify-start gap-2 items-start h-max">
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="w-max bordered px-2 py-1 rounded text-[#efefef]
                            centered gap-2 bg-green-600 h-min"
                            onClick={() => {
                                useMethod()
                                    .then(() => console.log('finish'))
                            }}
                        >
                            Применить
                        </button>
                        <ElementsInformationPanel
                            inequalities={configuration.inequalities}
                            sourceTarget={target}
                            shortedTarget={configuration.shortedTarget}
                            result={configuration.result}
                        />
                    </div>
                    <div
                        id="jxgbox"
                        className="jxgbox h-[800px] w-[800px] bordered border-gray-400
                        border-[2px] rounded-md centered"
                    >
                        <b className="px-2 text-center text-gray-300 text-xl">
                            Для получения графика нажмите кнопку "Применить"
                        </b>
                    </div>
                </div>
                {
                    (simplexResult && configuration.result && plotExtremum) && (
                        <div className="bg-green-800/80 text-white w-full p-2 rounded-md
                        shadow-md shadow-gray-400 mt-4">
                            <div className="flex gap-2">
                                <b>Точка на графике: </b>
                                <span>({plotExtremum.map((el) => Rational.fromNumber(el)).join(', ')})</span>
                            </div>
                            <div className="flex gap-2">
                                <b>Точка:</b>
                                <span>
                                ({
                                    simplexResult
                                        .map((el) =>
                                            Rational.fromNumber(el).toString()
                                        )
                                        .join(', ')
                                })
                            </span>
                            </div>
                            <div className="flex gap-2">
                                <b>Значение F(x):</b>
                                <span>{Rational.fromNumber(configuration.result.value).toString()}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default GraphicalMethodPanel;
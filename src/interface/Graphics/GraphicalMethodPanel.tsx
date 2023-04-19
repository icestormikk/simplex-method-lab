import React from 'react';
import {graphicalMethod} from "@/core/algorithms/graphical";
import {useAppSelector} from "@/redux/hooks";
import {passPlotStep} from "@/jsxgraph/start";
import ElementsInformationPanel from "@/interface/Graphics/ElementsInformationPanel";
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";

function GraphicalMethodPanel() {
    const target = useAppSelector((state) => state.main.targetFunction)
    const constraints = useAppSelector((state) => state.main.constraints)
    const [configuration, setConfiguration] = React.useState<{
        inequalities: Array<Inequality>,
        shortedTarget?: TargetFunction
    }>({
        inequalities: [],
        shortedTarget: undefined
    })

    const useMethod = () => {
        const {updatedTarget, constraintsList} = graphicalMethod(target, constraints)
        const inequalities = constraintsList
            .map((polynomial) =>
                new Inequality(polynomial, ">=", 0)
            )

        const extremum = passPlotStep(
            updatedTarget, inequalities
        )
        setConfiguration((prevState) => {
            prevState.inequalities = [...inequalities]
            prevState.shortedTarget = updatedTarget
            return {...prevState}
        })

        console.log(
            '(' + [
                ...inequalities.map((ineq, index) =>
                    ineq.polynomial.getValueIn(...extremum.coordinates)
                ),
                ...extremum.coordinates
            ].join(', ') + ')'
        )
    }

    return (
        <div className="centered w-full h-full p-2 bordered shadow-md">
            <div className="flex justify-start gap-2 items-start h-max">
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        className="w-max bordered px-2 py-1 rounded text-[#efefef]
                        centered gap-2 bg-green-600 h-min"
                        onClick={() => {
                            useMethod()
                        }}
                    >
                        Применить
                    </button>
                    <ElementsInformationPanel
                        inequalities={configuration.inequalities}
                        sourceTarget={target}
                        shortedTarget={configuration.shortedTarget}
                    />
                </div>
                <div
                    id="jxgbox"
                    className="jxgbox h-[800px] w-[800px] bordered rounded-md centered"
                >
                    <h1 className="px-2 text-center text-gray-300">
                        <i>Для получения графика нажмите кнопку "Применить"</i>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default GraphicalMethodPanel;
import React from 'react';
import ConditionNotification from "@/interface/ConditionNotification";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {MdOutlineSettingsSuggest} from "react-icons/md";
import MethodDescription from "@/interface/Basis/MethodDescription";
import {artificialBasisMethod} from "@/core/algorithms/simplex/artificial";
import SimplexMatrixTable from "@/interface/SimplexMatrixTable";
import {clearSteps} from "@/redux/slices/SimplexState";
import ColorViewer from "@/interface/Legend/ColorViewer";
import AdditionalContentPanel from "@/interface/Basis/AdditionalContent/AdditionalContentPanel";

function ArtificialBasisPanel() {
    const dispatch = useAppDispatch()
    const task = useAppSelector((state) => state.main)
    const simplex = useAppSelector((state) => state.simplex)
    const [launched, setLaunched] = React.useState(false)
    const isSuitable = React.useMemo(
        () => {
            return !task.targetFunction.isEmpty()
        },
        [task.targetFunction]
    )

    const useMethod = () => {
        setLaunched(true)
        dispatch(clearSteps())
        console.log(task.targetFunction.toString())
        artificialBasisMethod(
            task.targetFunction, task.constraints
        )
        console.log(task.targetFunction.toString())
    }

    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <ConditionNotification
                condition={isSuitable}
                successText="Условие выполнено"
                failureText="Необходимо определить условия задачи"
            />
            <button
                type="button"
                className={"w-max bordered px-2 py-1 rounded text-[#efefef] centered gap-2 " +
                (isSuitable ? 'bg-green-600' : 'bg-red-700')}
                disabled={!isSuitable}
                title={!isSuitable ? "Применение метода в данный момент невозможно" : ""}
                onClick={() => useMethod()}
            >
                Применить метод
                <MdOutlineSettingsSuggest className="text-2xl"/>
            </button>
            <div
                className="bg-gray-100 w-full min-h-[10rem] h-max rounded-md bordered relative shadow-md p-2
                flex flex-col gap-2"
            >
                {
                    !launched ? (
                        <MethodDescription
                            header="Здесь будут отображаться шаги алгоритма"
                            content="Описание алгоритма"
                        />
                    ) : (
                        <>
                            <div className="flex flex-col gap-2 p-2 bordered shadow-md rounded-md">
                                <ColorViewer colorHex="#00C55E" legend="Лучший опорный элемент: "/>
                                <ColorViewer colorHex="#bbf7d0" legend="Возможный опорный элемент: "/>
                            </div>
                            {
                                simplex.steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="simplex-step-view"
                                    >
                                        <SimplexMatrixTable
                                            matrix={step.simplexSnapshot}
                                            selectedElement={step.bearingElement}
                                            possibleBearingElements={step.possibleBearingElements}
                                        />
                                        <div className="flex flex-col gap-1 text-sm font-bold">
                                            {
                                                step.additionalContent && (
                                                    <AdditionalContentPanel
                                                        content={step.additionalContent}
                                                    />
                                                )
                                            }
                                            {
                                                step.possibleBearingElements.length > 0 && (
                                                    <div className="change-element-block">
                                                        <button
                                                            type="button"
                                                        >
                                                            Change
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ArtificialBasisPanel;
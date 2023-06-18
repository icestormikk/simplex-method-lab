import React from 'react';
import ConditionNotification from "@/interface/ConditionNotification";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {MdOutlineSettingsSuggest} from "react-icons/md";
import MethodDescription from "@/interface/Basis/MethodDescription";
import {artificialBasisMethod} from "@/core/algorithms/simplex/artificial";
import {clearSteps} from "@/redux/slices/SimplexState";
import ColorViewer from "@/interface/Legend/ColorViewer";
import StepsList from "@/interface/StepsInfo/StepsList";
import ResultPanel from "@/interface/Basis/ResultPanel";

function ArtificialBasisPanel() {
    const dispatch = useAppDispatch()
    const task = useAppSelector((state) => state.main)
    const result = useAppSelector((state) => state.simplex.result)
    const [launched, setLaunched] = React.useState(false)
    const isSuitable = React.useMemo(
        () => {
            return !task.targetFunction.isEmpty()
        },
        [task.targetFunction]
    )

    const useMethod = async () => {
        setLaunched(true)
        dispatch(clearSteps())
        await artificialBasisMethod(
            task.targetFunction, task.constraints
        )
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
                            header="Метод искусственного базиса"
                            content="Метод нахождения опорного решения задач линейного программирования
                            канонического вида, т.е. задач с ограничениями в форме равенств. Суть метода
                            искусственного базиса состоит в построении вспомогательной задачи с базисом
                            и переходе к новому базису, подходящему для исходной задачи."
                        />
                    ) : (
                        <>
                            <div className="flex flex-col gap-2 p-2 bordered shadow-md rounded-md">
                                <ColorViewer colorHex="#00C55E" legend="Лучший опорный элемент: "/>
                                <ColorViewer colorHex="#bbf7d0" legend="Возможный опорный элемент: "/>
                            </div>
                            <StepsList/>
                            {
                                result && (
                                    <ResultPanel point={result}/>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ArtificialBasisPanel;
import React from 'react';
import ConditionNotification from "@/interface/ConditionNotification";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import StartBasisForm from "@/interface/Basis/Default/StartBasisForm";
import {MdOutlineSettingsSuggest} from "react-icons/md";
import MethodDescription from "@/interface/Basis/MethodDescription";
import ColorViewer from "@/interface/Legend/ColorViewer";
import StepsList from "@/interface/StepsInfo/StepsList";
import ResultPanel from "@/interface/Basis/ResultPanel";
import {allElementsAreZero} from "@/core/algorithms/arrayhelper";
import {clearSteps} from "@/redux/slices/SimplexState";
import {simplexMethod} from "@/core/algorithms/simplex";

function DefaultBasisPanel() {
    const dispatch = useAppDispatch()
    const task = useAppSelector((state) => state.main)
    const result = useAppSelector((state) => state.simplex.result)
    const [basisCoefficients, setBasisCoefficients] = React.useState<Array<number>>(
        task.targetFunction.func.coefficients.map(() => 0)
    )
    const [launched, setLaunched] = React.useState(false)
    const isTargetNotEmpty = React.useMemo(
        () => {
            return !task.targetFunction.isEmpty()
        },
        [task.targetFunction]
    )
    const isStartBasisInitialized = React.useMemo(
        () => {
            return !allElementsAreZero(basisCoefficients)
        },
        [basisCoefficients]
    )
    const isSuitable = React.useMemo(
        () => {
            return isStartBasisInitialized && isTargetNotEmpty
        },
        [isStartBasisInitialized, isTargetNotEmpty]
    )

    const useMethod = () => {
        const selectedColumnIndexes: Array<number> = []
        basisCoefficients.forEach((el, index) => {
            if (el > 0) {
                selectedColumnIndexes.push(index)
            }
        })

        setLaunched(true)
        dispatch(clearSteps())
        simplexMethod(
            task.targetFunction,
            task.constraints,
            selectedColumnIndexes
        )
    }

    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <div className="flex gap-2">
                <ConditionNotification
                    condition={isTargetNotEmpty}
                    successText="Условие выполнено"
                    failureText="Необходимо определить условия задачи"
                />
                <ConditionNotification
                    condition={isStartBasisInitialized}
                    successText="Условие выполнено"
                    failureText="Определите базис"
                />
            </div>
            <div className="w-full bordered rounded-md shadow-md p-1">
                <b>Начальный базис:</b>
                <StartBasisForm
                    basisCoefficients={basisCoefficients}
                    setBasisCoefficients={setBasisCoefficients}
                />
            </div>
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

export default DefaultBasisPanel;
import React from 'react';
import CoefficientsBuilderTable from "@/interface/Menu/constraints/BuilderTable/CoefficientsBuilderTable";
import {ImCheckmark} from "react-icons/im";
import {RxReset} from "react-icons/rx";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {FractionView} from "@/core/domain/math/enums/FractionView";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    updateConstraintsList,
    updateFractionViewMode,
    updateTargetFunction
} from "@/redux/slices/MainState";
import CurrentTargetFunctionBlock from "@/interface/Menu/constraints/BuilderTable/CurrentStateTable";

function ConstraintsMenu() {
    const dispatch = useAppDispatch()
    const {targetFunction, constraints, fractionViewMode} = useAppSelector((state) => state.main)
    const [configuration, setConfiguration] = React.useState({
        target: targetFunction,
        constraints: [...constraints],
        fractionView: fractionViewMode
    })

    const onSubmit = async () => {
        console.log(configuration)
        dispatch(updateTargetFunction(configuration.target))
        dispatch(
            updateConstraintsList(
                configuration.constraints
                    .filter((eq) => eq.polynomial.coefficients.reduce((a,b) =>
                        a + b.multiplier, 0
                    ) !== 0)
            )
        )
        dispatch(updateFractionViewMode(configuration.fractionView))
    }

    return (
        <div className="flex justify-start items-start flex-col">
            <CurrentTargetFunctionBlock/>
            <div className="constraints-menu-panel">
                <b>Коэффициенты целевой функции и ограничений:</b>
                <CoefficientsBuilderTable
                    configuration={{
                        target: configuration.target,
                        constraints: configuration.constraints
                    }}
                />
            </div>
            <div className="w-full adaptive-flex">
                <div className="constraints-menu-panel">
                    <b>Задача оптимизации: </b>
                    <select
                        name="optimization_mode"
                        id="optimization_mode"
                        onChange={(mode) => {
                            const value: string = mode.target.value
                            setConfiguration((prevState) => {
                                if (value === ExtremumType.MAXIMUM) {
                                    prevState.target.extremumType = ExtremumType.MAXIMUM
                                }
                                else {
                                    prevState.target.extremumType = ExtremumType.MINIMUM
                                }

                                return prevState
                            })
                        }}
                        defaultValue={ExtremumType.MINIMUM}
                    >
                        <option value={ExtremumType.MINIMUM}>Минимизировать</option>
                        <option value={ExtremumType.MAXIMUM}>Максимизировать</option>
                    </select>
                </div>
                <div className="constraints-menu-panel">
                    <b>Вид дробей:</b>
                    <select
                        name="fraction_view"
                        id="fraction_view"
                        onChange={(view) => {
                            setConfiguration((prevState) => {
                                prevState.fractionView = FractionView[
                                    view.target.value as keyof typeof FractionView
                                ]

                                return prevState
                            })
                        }}
                        defaultValue={FractionView.REAL}
                    >
                        <option value={FractionView.RATIONAL}>Рациональные</option>
                        <option value={FractionView.REAL}>Вещественные</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-start items-center px-1 py-4 gap-2">
                <button
                    type="button"
                    className="centered gap-2 bg-green-600/80 rounded-md px-2 py-0.5 text-white
                    text-base"
                    onClick={async () => {
                        await onSubmit()
                    }}
                >
                    <ImCheckmark/>
                    <span>Применить</span>
                </button>
                <button
                    type="button"
                    className="centered gap-2 bg-gray-500/80 rounded-md px-2 py-0.5 text-white
                    text-base"
                >
                    <RxReset/>
                    <span>Сбросить</span>
                </button>
            </div>
        </div>
    );
}

export default ConstraintsMenu;
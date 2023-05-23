import React from 'react';
import CoefficientsBuilderTable from "@/interface/Menu/constraints/BuilderTable/CoefficientsBuilderTable";
import {ImCheckmark} from "react-icons/im";
import {RxReset} from "react-icons/rx";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {FractionView} from "@/core/domain/math/enums/FractionView";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    dropState,
    updateConstraintsList,
    updateFractionViewMode,
    updateTargetFunction
} from "@/redux/slices/MainState";
import CurrentTargetFunctionBlock from "@/interface/Menu/constraints/BuilderTable/CurrentStateTable";
import ModalWindow from "@/interface/Modal/ModalWindow";
import UploadModalContent from "@/interface/Menu/constraints/UploadModalContent";
import {allElementsAreZero} from "@/core/algorithms/arrayhelper";
import {Equation} from "@/core/domain/math/classes/Equation";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import Coefficient from "@/core/domain/math/classes/Coefficient";
import {AiOutlineDownload} from "react-icons/ai";
import DownloadModalContent from "@/interface/Menu/constraints/DownloadModalContent";

function ConstraintsMenu() {
    const dispatch = useAppDispatch()
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)
    const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false)
    const targetFunction = useAppSelector((state) => state.main.targetFunction)
    const constraints = useAppSelector((state) => state.main.constraints)
    const fractionViewMode = useAppSelector((state) => state.main.fractionViewMode)
    const [configuration, setConfiguration] = React.useState({
        target: targetFunction.copy(),
        constraints: constraints.map((eq) => eq.copy()),
        fractionView: fractionViewMode
    })

    const onSubmit = async () => {
        dispatch(updateTargetFunction(configuration.target))
        dispatch(
            updateConstraintsList(
                configuration.constraints
                    .filter((eq) =>
                        !allElementsAreZero(
                            eq.polynomial.coefficients.map((el) => el.multiplier)
                        )
                    )
            )
        )
        dispatch(updateFractionViewMode(configuration.fractionView))
    }

    const onReset = () => {
        dispatch(dropState())
        setConfiguration((prevState) => {
            prevState.target.func.coefficients.splice(
                0,
                prevState.target.func.coefficients.length,
                new Coefficient(0, 0)
            )
            prevState.constraints.splice(
                0,
                prevState.constraints.length,
                new Equation(
                    Polynomial.fromNumbersArray([0]), 0
                )
            )

            return prevState
        })
    }

    return (
        <div className="flex justify-start items-start flex-col">
            <CurrentTargetFunctionBlock/>
            <div className="constraints-menu-panel">
                <b>Коэффициенты целевой функции и ограничений:</b>
                <div className="flex flex-row gap-2">
                    <button
                        type="button"
                        className="centered gap-2"
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        <AiOutlineDownload/>
                        Загрузить из файла
                    </button>
                    <button
                        type="button"
                        className="centered gap-2"
                        onClick={() => setIsDownloadModalOpen(true)}
                    >
                        <AiOutlineDownload/>
                        Сохранить в файл
                    </button>
                </div>
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
                                    configuration.target.extremumType = ExtremumType.MAXIMUM
                                }
                                else {
                                    configuration.target.extremumType = ExtremumType.MINIMUM
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
                            const value = FractionView[
                                view.target.value as keyof typeof FractionView
                            ]
                            setConfiguration((prevState) => {
                                prevState.fractionView = value
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
                    onClick={() => onReset()}
                >
                    <RxReset/>
                    <span>Сбросить</span>
                </button>
            </div>
            {
                isUploadModalOpen && (
                    <ModalWindow
                        isOpen={isUploadModalOpen}
                        setIsOpen={setIsUploadModalOpen}
                        title="Загрузить из файла"
                        content={(
                            <UploadModalContent/>
                        )}
                    />
                )
            }
            {
                isDownloadModalOpen && (
                    <ModalWindow
                        isOpen={isDownloadModalOpen}
                        setIsOpen={setIsDownloadModalOpen}
                        title="Сохранить в файл"
                        content={(
                            <DownloadModalContent/>
                        )}
                    />
                )
            }
        </div>
    );
}

export default ConstraintsMenu;
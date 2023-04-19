import React from 'react';
import SimplexMatrixTable from "@/interface/SimplexMatrixTable";
import {AdditionalContentType, removeStepsAfterIndex} from "@/redux/slices/SimplexState";
import AdditionalContentPanel from "@/interface/Basis/AdditionalContent/AdditionalContentPanel";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {passArtificialSimplexMethod} from "@/core/algorithms/simplex/artificial";
import {passDefaultSimplexMethod} from "@/core/algorithms/simplex";
import {SimplexStepInfo} from "@/interface/domain/types/SimplexStepInfo";

interface SimplexStepProps {
    stepInfo: SimplexStepInfo<AdditionalContentType>,
    stepIndex: number
}

function SimplexStep({stepInfo, stepIndex}: SimplexStepProps) {
    const dispatch = useAppDispatch()
    const steps = useAppSelector((state) => state.simplex.steps)
    const [pickedElement, setPickedElement] = React.useState<MatrixElement>({
        ...stepInfo.bearingElement
    })

    const handleBearingElementChanging = () => {
        const isPossibleElement = stepInfo.possibleBearingElements.find((el) =>
            el.rowIndex === pickedElement?.rowIndex && el.columnIndex === pickedElement?.columnIndex
        )
        const isBearingElement = stepInfo.bearingElement.rowIndex === pickedElement?.rowIndex &&
            stepInfo.bearingElement.columnIndex === pickedElement?.columnIndex

        if (!isPossibleElement && !isBearingElement) {
            return
        }

        dispatch(
            removeStepsAfterIndex(
                Math.min(steps.length - 1, stepIndex)
            )
        )
        if (stepInfo.isArtificialBasisStep) {
            passArtificialSimplexMethod(
                stepInfo.target,
                stepInfo.simplexSnapshot,
                stepInfo.appendedCoefficientIndexes!,
                {
                    element: pickedElement,
                    possibleElements: stepInfo.possibleBearingElements
                }
            )
        } else {
            passDefaultSimplexMethod(
                stepInfo.target,
                stepInfo.simplexSnapshot,
                {
                    element: pickedElement,
                    possibleElements: stepInfo.possibleBearingElements
                }
            )
        }
    }

    return (
        <div className="simplex-step-view">
            <SimplexMatrixTable
                matrix={stepInfo.simplexSnapshot}
                selectedElement={stepInfo.bearingElement}
                possibleBearingElements={stepInfo.possibleBearingElements}
                setPickedElement={setPickedElement}
            />
            <div className="flex w-full justify-between gap-1 text-sm font-bold lg:flex-row flex-col p-2">
                {
                    stepInfo.additionalContent && (
                        <AdditionalContentPanel
                            content={stepInfo.additionalContent}
                        />
                    )
                }
                <div className="flex justify-end items-end w-max">
                    {
                        stepInfo.possibleBearingElements.length > 0 && (
                            <div className="change-element-block">
                                <b className="text-gray-500">
                                    Имеется возможность поменять опорный элемент
                                </b>
                                <div className="flex justify-between items-center w-full">
                                    <b className="text-gray-400">
                                        {`Текущий элемент: (${pickedElement.rowIndex}, ${pickedElement.columnIndex})`}
                                    </b>
                                    <button
                                        type="button"
                                        className="centered px-2 py-0.5 bg-green-500 text-sm text-white rounded-sm
                                        shadow-md"
                                        onClick={() => handleBearingElementChanging()}
                                    >
                                        Применить
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default SimplexStep;
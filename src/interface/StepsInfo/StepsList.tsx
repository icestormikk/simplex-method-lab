import React from 'react';
import {useAppSelector} from "@/redux/hooks";
import SimplexStep from "@/interface/StepsInfo/SimplexStep";

function StepsList() {
    const {steps} = useAppSelector((state) => state.simplex)

    return (
        <div className="steps-container">
            {
                steps.map((el, index) => (
                    <SimplexStep
                        key={index}
                        index={index}
                        stepInfo={{
                            simplexSnapshot: el.simplexSnapshot,
                            possibleBearingElements: el.possibleBearingElements,
                            bearingElement: {
                                multiplier: -1,
                                rowIndex: el.bearingElement.rowIndex,
                                columnIndex: el.bearingElement.columnIndex
                            }
                        }}
                    />
                ))
            }
        </div>
    );
}

export default StepsList;
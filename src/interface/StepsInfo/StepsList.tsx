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
                            matrix: el.simplexSnapshot,
                            bearingElement: {
                                multiplier: -1,
                                rowIndex: el.bearingElement.row,
                                columnIndex: el.bearingElement.column
                            }
                        }}
                    />
                ))
            }
        </div>
    );
}

export default StepsList;
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
                        stepInfo={el}
                        stepIndex={index}
                    />
                ))
            }
        </div>
    );
}

export default StepsList;
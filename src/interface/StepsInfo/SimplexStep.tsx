import React from 'react';
import SimplexMatrixTable from "@/interface/SimplexMatrixTable";
import {SimplexStepInfo} from "@/interface/types/SimplexStepInfo";
import {AdditionalContentType} from "@/redux/slices/SimplexState";

interface SimplexStepProps {
    stepInfo: SimplexStepInfo<AdditionalContentType>,
    index: number
}

function SimplexStep({stepInfo, index}: SimplexStepProps) {
    return (
        <div className="simplex-step">
            <div className="fog-block"/>
            <SimplexMatrixTable
                matrix={stepInfo.simplexSnapshot}
                selectedElement={stepInfo.bearingElement}
                possibleBearingElements={stepInfo.possibleBearingElements}
            />
        </div>
    );
}

export default SimplexStep;
import React from 'react';
import StepNumber from "@/interface/StepsInfo/StepNumber";
import SimplexMatrixTable from "@/interface/SimplexMatrixTable";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";
import {MatrixElement} from "@/core/domain/math/aliases/MatrixElement";

interface SimplexStepProps {
    stepInfo: {
        matrix: SimplexMatrix,
        bearingElement: MatrixElement
    },
    index: number
}

function SimplexStep({stepInfo, index}: SimplexStepProps) {
    return (
        <div className="simplex-step">
            <div className="fog-block"/>
            <StepNumber index={index + 1}/>
            <SimplexMatrixTable
                matrix={stepInfo.matrix}
                selectedElement={{
                    row: stepInfo.bearingElement.rowIndex!,
                    column: stepInfo.bearingElement.columnIndex!
                }}
            />
        </div>
    );
}

export default SimplexStep;
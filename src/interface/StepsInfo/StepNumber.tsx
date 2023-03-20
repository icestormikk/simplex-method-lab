import React from 'react';

interface StepNumberProps {
    index: number
}

function StepNumber({index}: StepNumberProps) {
    return (
        <div className="simplex-step-number-block">
            <span>{index}</span>
        </div>
    );
}

export default StepNumber;
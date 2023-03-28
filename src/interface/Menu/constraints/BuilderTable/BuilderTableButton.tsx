import React from 'react';

interface BuilderTableButtonProps {
    icon: JSX.Element,
    bgColor: string,
    action: (...args: Array<any>) => void,
    blockingCondition?: boolean
}

function BuilderTableButton({icon, bgColor, action, blockingCondition = false}: BuilderTableButtonProps) {
    return (
        <button
            type="button"
            className={"text-2xl h-10 min-w-[3rem] rounded-sm font-bold " +
            "text-white w-min centered " + bgColor}
            onClick={action}
            disabled={blockingCondition}
        >
            {icon}
        </button>
    );
}

export default BuilderTableButton;
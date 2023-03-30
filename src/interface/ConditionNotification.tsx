import React from 'react';
import {TiWarningOutline} from "react-icons/ti";
import {ImCheckmark2} from "react-icons/im";

interface ConditionNotificationProps {
    condition: boolean,
    successText: string,
    failureText: string
}

function ConditionNotification({condition, successText, failureText} : ConditionNotificationProps) {
    return (
        <div
            className={"bordered centered p-2 rounded-xl w-max gap-2 font-bold shadow-md " +
            (condition ? 'text-green-500': 'text-red-500')}
        >
            <div className="bg-white rounded-xl centered p-2 shadow-md bordered text-2xl">
                {
                    condition ? (
                        <ImCheckmark2/>
                    ) : (
                        <TiWarningOutline/>
                    )
                }
            </div>
            <p>
                {
                    condition ? successText : failureText
                }
            </p>
        </div>
    );
}

export default ConditionNotification;
import React from 'react';
import {ImWarning} from "react-icons/im";

interface WarningProps {
    message: string
}

function Warning({message}: WarningProps) {
    return (
        <div
            className="w-max border-[1px] border-gray-300 rounded-xl shadow-md
            flex justify-start items-center gap-2 text-orange-400 p-2 font-bold"
        >
            <ImWarning/>
            <p>{message}</p>
        </div>
    );
}

export default Warning;
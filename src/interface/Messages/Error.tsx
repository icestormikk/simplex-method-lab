import React from 'react';
import {TbFaceIdError} from "react-icons/tb";

interface ErrorProps {
    message: string
}

function Error({message}: ErrorProps) {
    return (
        <div
            className="w-max border-[1px] border-gray-300 rounded-xl shadow-xl
            flex justify-start items-center gap-2 text-red-400"
        >
            <TbFaceIdError/>
            <p>{message}</p>
        </div>
    );
}

export default Error;
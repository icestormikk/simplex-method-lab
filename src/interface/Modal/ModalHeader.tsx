import React from 'react';
import {GrClose} from "react-icons/gr";

interface ModalHeaderProps {
    title: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalHeader({title, setIsOpen}: ModalHeaderProps) {
    return (
        <div
            className="border-b-[1px] border-b-gray-300 py-2 px-1 flex justify-between
            items-center gap-12"
        >
            <b>{title}</b>
            <button
                type="button"
                className="centered text-md text-red-500"
                onClick={() => setIsOpen(false)}
            >
                <GrClose/>
            </button>
        </div>
    );
}

export default ModalHeader;
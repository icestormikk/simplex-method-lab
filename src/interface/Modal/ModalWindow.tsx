import React from 'react';
import ModalHeader from "@/interface/Modal/ModalHeader";

interface ModalWindowProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    content: JSX.Element
}

function ModalWindow({isOpen, setIsOpen, title, content}: ModalWindowProps) {
    const escPressedListener = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        },
        [setIsOpen]
    )

    React.useEffect(
        () => {
            document.body.addEventListener("keydown", escPressedListener)
            return function cleanup() {
                document.body.removeEventListener("keydown", escPressedListener)
            }
        },
        [escPressedListener]
    )

    return (
        <div
            className={"fixed top-0 left-0 h-screen w-screen bg-black/50 centered z-10 "
            + (isOpen ? 'flex' : 'hidden')}
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-max h-max rounded-md overflow-hidden bg-white z-10"
                onClick={(event) => event.stopPropagation()}
            >
                <ModalHeader title={title} setIsOpen={setIsOpen}/>
                {content}
            </div>
        </div>
    );
}

export default ModalWindow;
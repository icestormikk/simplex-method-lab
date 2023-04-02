import React from 'react';
import {AiFillCaretUp, AiOutlineCaretDown} from "react-icons/ai";
import {AdditionalContentType} from "@/redux/slices/SimplexState";
import TagsViewer from "@/interface/Basis/AdditionalContent/TagsViewer";

interface AdditionalContentPanelProps {
    content: AdditionalContentType
}

function AdditionalContentPanel({content}: AdditionalContentPanelProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="step-additional-content">
            <TagsViewer tags={content.tags}/>
            {
                content.calculations.length > 0 && (
                    <>
                        <p>Вычисления:</p>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen((prevState) => !prevState)
                            }}
                            className={"w-max bordered shadow-md text-white rounded-md px-4 py-1 " +
                                (isOpen ? 'bg-gray-400' : 'bg-green-500') + " centered gap-1"}
                        >
                            {
                                isOpen ? (
                                    <>
                                        <span>Скрыть</span>
                                        <AiFillCaretUp/>
                                    </>
                                ) : (
                                    <>
                                        <span>Показать</span>
                                        <AiOutlineCaretDown/>
                                    </>
                                )
                            }
                        </button>
                        {
                            isOpen && (
                                <ul>
                                    {
                                        content.calculations.map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default AdditionalContentPanel;
import React from 'react';
import {HasErrorTag, SimplexStepTag} from "@/core/domain/math/enums/SimplexStepTag";
import {FiSettings} from "react-icons/fi";
import {BiError} from "react-icons/bi";

interface TagsViewerProps {
    tags: Array<SimplexStepTag>
}

function TagsViewer({tags}: TagsViewerProps) {
    const isErrorTag = (tag: SimplexStepTag) => {
        return tag instanceof HasErrorTag
    }

    return (
        <div className="flex flex-col justify-start items-start">
            {
                tags && tags.map((tag, index) => (
                    <div
                        key={index}
                        className={"centered gap-2 text-base " + (isErrorTag(tag) ? "text-red-500" : "")}
                    >
                        {
                            isErrorTag(tag) ? (
                                <BiError/>
                            ) : (
                                <FiSettings/>
                            )
                        }
                        <span>{tag.message}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default TagsViewer;
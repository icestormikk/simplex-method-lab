import React from 'react';

interface ChapterProps {
    title: string
}

function Chapter(props: ChapterProps) {
    return (
        <div className="border-b-[1px] border-b-gray-500 py-2 w-full">
            <b>{props.title}</b>
        </div>
    );
}

export default Chapter;
import React from 'react';

interface ColorViewerProps {
    colorHex: string,
    legend: string
}

function ColorViewer({colorHex, legend} : ColorViewerProps) {
    return (
        <div className="flex justify-start items-center flex-row gap-2">
            <b>{legend}</b>
            <div
                className="h-6 w-12 rounded-md border-[1px] border-gray-400"
                style={{backgroundColor: colorHex}}
            />
        </div>
    );
}

export default ColorViewer;
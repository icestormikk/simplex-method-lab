import React from 'react';

interface MethodDescriptionProps {
    header?: string | JSX.Element,
    content?: string | JSX.Element
}

function MethodDescription({header, content}: MethodDescriptionProps) {
    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 left-0
        text-center">
            {
                typeof header === 'string' ? (
                    <b className="text-2xl">{header}</b>
                ) : (
                    header
                )
            }
            {
                typeof content === 'string' ? (
                    <p>{content}</p>
                ) : (
                    content && (
                        content
                    )
                )
            }
        </div>
    );
}

export default MethodDescription;
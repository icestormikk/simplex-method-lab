import React from 'react';

interface QAProps {
    question: string
    answer: string
}

function QA(props: QAProps) {
    return (
        <div className="flex flex-col justify-start items-start gap-2">
            <b>{props.question}</b>
            <p>{props.answer}</p>
        </div>
    );
}

export default QA;
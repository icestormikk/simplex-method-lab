import React from 'react';

interface UsedInstrumentPanelProps {
    icon: any,
    title: string,
    instrumentTitle: string
}

function UsedInstrumentPanel(props: UsedInstrumentPanelProps) {
    return (
        <tr className="text-2xl">
            <td>
                <b>{props.title}</b>
            </td>
            <td>{props.instrumentTitle}</td>
            <td className="h-20 min-h-[5rem] min-w-[5rem] w-20">
                {props.icon}
            </td>
        </tr>
    );
}

export default UsedInstrumentPanel;
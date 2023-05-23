import React, {MouseEvent} from 'react';
import {shell} from "electron";

interface ExternalUrlProps {
    url: string,
    title: string,
    icon?: JSX.Element
}

function ExternalUrl(props: ExternalUrlProps) {
    async function onLinkClick(event: MouseEvent<HTMLAnchorElement>) {
        event.preventDefault()
        await shell.openExternal(props.url)
    }

    return (
        <a href="" onClick={onLinkClick} className="centered flex-nowrap gap-2">
            {props.title}
            {props.icon && (props.icon)}
        </a>
    );
}

export default ExternalUrl;
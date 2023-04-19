import {ReactNode} from "react";

export type Tab = {
    title: string,
    icon?: ReactNode,
    action?: (...args: Array<any>) => void,
    isBlocked: boolean
}

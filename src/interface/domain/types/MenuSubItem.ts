export type MenuSubItem = {
    title: string,
    icon: JSX.Element,
    action: (...args: Array<any>) => void
}
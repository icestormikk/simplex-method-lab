import {MenuSubItem} from "@/interface/types/MenuSubItem";

export type MenuItem = {
    icon: JSX.Element,
    title: string,
    variants: Array<MenuSubItem>
}
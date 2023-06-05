import {MenuSubItem} from "@/interface/domain/types/MenuSubItem";

export type MenuItem = {
    icon: JSX.Element,
    title: string,
    variants: Array<MenuSubItem>
}
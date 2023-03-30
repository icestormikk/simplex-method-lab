import React from 'react';
import MenuItemPanel from "@/interface/Menu/MenuItemPanel";
import {MenuSubItem} from "@/interface/types/MenuSubItem";

type MenuItem = {
    icon: JSX.Element,
    title: string,
    variants: Array<MenuSubItem>
}

interface MenuProps {
    items: Array<MenuItem>
}

function Menu({items}: MenuProps) {
    return (
        <div className="flex justify-start items-center absolute top-0 left-0">
            {
                items.map((el, index) => (
                    <MenuItemPanel
                        key={index}
                        item={el}
                    />
                ))
            }
        </div>
    );
}

export default Menu;
import React from 'react';
import {MenuSubItem} from "@/interface/types/MenuSubItem";

interface MenuSubItemPanelProps {
    item: MenuSubItem
}

function MenuSubItemPanel({item} : MenuSubItemPanelProps) {
    return (
        <li
            className="menu-item bg-gray-100 hover:bg-gray-200 cursor-pointer"
            onClick={item.action}
        >
            {item.icon}
            {item.title}
        </li>
    );
}

export default MenuSubItemPanel;
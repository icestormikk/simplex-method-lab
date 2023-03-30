import React from 'react';
import MenuSubItemPanel from "@/interface/Menu/MenuSubItemPanel";
import {MenuItem} from "@/interface/types/MenuItem";

interface MenuItemProps {
    item: MenuItem
}

function MenuItemPanel({item} : MenuItemProps) {
    const [isSelected, setIsSelected] = React.useState(false)

    return (
        <div className="flex flex-col relative">
            <button
                type="button"
                className="menu-item"
                onClick={() => {
                    setIsSelected((prevState) => !prevState)
                }}
            >
                {item.icon}
                {item.title}
            </button>
            {
                isSelected && (
                    <ul className="absolute top-full">
                        {
                            item.variants.map((variant, index) => (
                                <MenuSubItemPanel
                                    key={index}
                                    item={variant}
                                />
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
}

export default MenuItemPanel;

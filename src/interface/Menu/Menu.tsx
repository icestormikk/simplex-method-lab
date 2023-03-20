import React from 'react';

type MenuItem = {
    icon: JSX.Element,
    title: string,
    action: (...args: Array<any>) => void
}

interface MenuProps {
    items: Array<MenuItem>
}

function Menu({items}: MenuProps) {
    return (
        <div className="flex justify-start items-center absolute top-0 left-0">
            {
                items.map((el, index) => (
                    <button
                        key={index}
                        className="menu-item"
                        onClick={el.action}
                    >
                        {el.icon}
                        {el.title}
                    </button>
                ))
            }
        </div>
    );
}

export default Menu;
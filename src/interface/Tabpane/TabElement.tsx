import React from 'react';
import {Tab} from "@/interface/domain/types/Tab";
import {BiLock} from "react-icons/bi";

interface TabElementProps {
    tab: Tab,
}

function TabElement({tab}: TabElementProps) {
    return (
        <button
            type="button"
            className="tab-element"
            onClick={tab.action}
            disabled={tab.isBlocked}
        >
            {
                tab.isBlocked && (
                    <BiLock/>
                )
            }
            {tab.icon}
            {tab.title}
        </button>
    );
}

export default TabElement;
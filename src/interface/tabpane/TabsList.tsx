import React from 'react';
import {Tab} from "@/interface/types/Tab";
import TabElement from "@/interface/tabpane/TabElement";

interface TabListProps {
    tabs: Array<Tab>,
    tabIndexChanger: React.Dispatch<React.SetStateAction<number>>
}

function TabsList({tabs, tabIndexChanger}: TabListProps) {
    return (
        <div
            className="flex justify-start items-start"
        >
            {
                tabs.map((tab, index) => (
                    <TabElement
                        key={index}
                        tab={{
                            ...tab,
                            action: () => {
                                if (tab.action) {
                                    tab.action()
                                }
                                tabIndexChanger(index)
                            }
                        }}
                    />
                ))
            }
        </div>
    );
}

export default TabsList;
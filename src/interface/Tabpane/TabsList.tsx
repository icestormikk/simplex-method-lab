import React from 'react';
import TabElement from "@/interface/Tabpane/TabElement";
import {Tab} from "@/interface/domain/types/Tab";

interface TabListProps {
    tabs: Array<Tab>,
    tabIndexChanger: React.Dispatch<React.SetStateAction<number>>
}

function TabsList({tabs, tabIndexChanger}: TabListProps) {
    return (
        <div
            className="flex justify-start items-start w-full"
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
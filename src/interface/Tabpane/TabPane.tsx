import React, {ReactNode} from 'react';
import TabsList from "@/interface/Tabpane/TabsList";
import {Tab} from "@/interface/types/Tab";

interface TabPaneProps {
    tabs: Array<{tab: Tab, content: ReactNode}>
}

function TabPane({tabs}: TabPaneProps) {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

    return (
        <div className="flex justify-start items-start flex-col w-full">
            <TabsList
                tabs={
                    tabs.map((el) => el.tab)
                }
                tabIndexChanger={setSelectedTabIndex}
            />
            <div
                className="border-t-[1px] border-t-gray-400 w-full pr-2 pt-2"
            >
                {
                    tabs[selectedTabIndex].content
                }
            </div>
        </div>
    );
}

export default TabPane;
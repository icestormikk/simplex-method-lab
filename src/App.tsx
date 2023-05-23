import './index.css'
import React from "react";
import TabPane from "@/interface/Tabpane/TabPane";
import ConstraintsMenu from "@/interface/Menu/constraints/ConstraintsMenu";
import ArtificialBasisPanel from "@/interface/Basis/Artificial/ArtificialBasisPanel";
import DefaultBasisPanel from "@/interface/Basis/Default/DefaultBasisPanel";
import GraphicalMethodPanel from "@/interface/Graphics/GraphicalMethodPanel";
import About from "@/interface/About/About";

function App() {
    const tabs = React.useMemo(
        () => {
            return [
                {
                    tab: {
                        title: 'Об авторе',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <About/>
                    )
                },
                {
                    tab: {
                        title: 'Условия задачи',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <ConstraintsMenu/>
                    )
                },
                {
                    tab: {
                        title: 'Симплекс-метод',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <DefaultBasisPanel/>
                    )
                },
                {
                    tab: {
                        title: 'Метод искусственного базиса',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <ArtificialBasisPanel/>
                    )
                },
                {
                    tab: {
                        title: 'Графический метод',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <GraphicalMethodPanel/>
                    )
                }
            ]
        },
        []
    )

    return (
        <div className="App">
            <div className="w-full h-full">
                <TabPane tabs={tabs}/>
            </div>
        </div>
    )
}

export default App

import './index.css'
import React from "react";
import TabPane from "@/interface/Tabpane/TabPane";
import ConstraintsMenu from "@/interface/Menu/constraints/ConstraintsMenu";
import ArtificialBasisPanel from "@/interface/Basis/Artificial/ArtificialBasisPanel";
import DefaultBasisPanel from "@/interface/Basis/Default/DefaultBasisPanel";
import GraphicalMethodPanel from "@/interface/Graphics/GraphicalMethodPanel";
import About from "@/interface/About/About";
import {BiQuestionMark} from "react-icons/bi";
import {BsPerson} from "react-icons/bs";
import Help from "@/interface/Help/Help";

function App() {
    const tabs = React.useMemo(
        () => {
            return [
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
                        title: 'Графический метод (2D)',
                        icon: undefined,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <GraphicalMethodPanel/>
                    )
                },
                {
                    tab: {
                        title: 'Об авторе',
                        icon: <BsPerson/>,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <About/>
                    )
                },
                {
                    tab: {
                        title: 'Справка',
                        icon: <BiQuestionMark/>,
                        action: () => {},
                        isBlocked: false
                    },
                    content: (
                        <Help/>
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

import './index.css'
import React from "react";
import {AiFillFile, AiOutlineQuestion} from "react-icons/all";
import {BiDownload, BiUpload} from "react-icons/bi"
import {GiPerson} from "react-icons/gi";
import TabPane from "@/interface/Tabpane/TabPane";
import ConstraintsMenu from "@/interface/Menu/constraints/ConstraintsMenu";
import Menu from "@/interface/Menu/Menu";
import ArtificialBasisPanel from "@/interface/Basis/Artificial/ArtificialBasisPanel";
import {MenuItem} from "@/interface/domain/types/MenuItem";
import DefaultBasisPanel from "@/interface/Basis/Default/DefaultBasisPanel";
import GraphicalMethodPanel from "@/interface/Graphics/GraphicalMethodPanel";

function App() {
    const items: Array<MenuItem> = [
        {
            title: 'Файл',
            icon: <AiFillFile/>,
            variants: [
                {
                    title: 'Загрузить из файла',
                    icon: <BiUpload/>,
                    action: () => {
                        console.log('1')
                    }
                },
                {
                    title: 'Сохранить в файл',
                    icon: <BiDownload/>,
                    action: () => {
                        console.log('2')
                    }
                }
            ]
        },
        {
            title: 'Справка',
            icon: <AiOutlineQuestion/>,
            variants: [
                {
                    title: 'Об авторе',
                    icon: <GiPerson/>,
                    action: () => {
                        console.log('3')
                    }
                }
            ]
        }
    ]

    const tabs = React.useMemo(
        () => {
            return [
                {
                    tab: {
                        title: 'Условия задачи',
                        icon: undefined,
                        action: () => {
                            console.log(0)
                        },
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
                        action: () => {
                            console.log(1)
                        },
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
                        action: () => {
                            console.log(2)
                        },
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
                        action: () => {
                            console.log(3)
                        },
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
            <Menu items={items}/>
            <div className="mt-10 w-full h-full">
                <TabPane tabs={tabs}/>
            </div>
        </div>
    )
}

export default App

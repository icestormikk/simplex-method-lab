import './index.css'
import React from "react";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Equation} from "@/core/domain/math/classes/Equation";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {useAppDispatch} from "@/redux/hooks";
import {AiFillFile, AiOutlineQuestion, BiDownload, BiUpload, GiPerson} from "react-icons/all";
import TabPane from "@/interface/Tabpane/TabPane";
import ConstraintsMenu from "@/interface/Menu/constraints/ConstraintsMenu";
import {artificialBasisMethod} from "@/core/algorithms/simplex/artificial";
import Menu from "@/interface/Menu/Menu";
import {MenuItem} from "@/interface/types/MenuItem";
import ArtificialBasisPanel from "@/interface/Basis/Artificial/ArtificialBasisPanel";

function App() {
    const dispatch = useAppDispatch()

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
                        <h1>World</h1>
                    )
                },
                {
                    tab: {
                        title: 'Метод искусственного базиса',
                        icon: undefined,
                        action: () => {
                            console.log(12)
                        },
                        isBlocked: false
                    },
                    content: (
                        <ArtificialBasisPanel/>
                    )
                }
            ]
        },
        []
    )

    const action = () => {
        const tf1 = new TargetFunction(
            Polynomial.fromNumbersArray([2, 1, -1, 3, -2]), ExtremumType.MINIMUM
        )
        const constraints = [
            new Equation(Polynomial.fromNumbersArray([8, 2, 3, 5, 9]), 30),
            new Equation(Polynomial.fromNumbersArray([5, 1, 2, 5, 6]), 19),
            new Equation(Polynomial.fromNumbersArray([1, 1, 0, 3, 0]), 3),
        ]

        // simplexMethod(tf1, constraints, [0, 1, 2])
        artificialBasisMethod(tf1, constraints)
    }

    return (
        <div className="App">
            <Menu items={items}/>
            <div className="mt-10 w-full">
                <TabPane tabs={tabs}/>
            </div>
        </div>
    )
}

export default App

import './index.css'
import React from "react";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Equation} from "@/core/domain/math/classes/Equation";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {useAppDispatch} from "@/redux/hooks";
import {BiDownload, BiUpload} from "react-icons/all";
import TabPane from "@/interface/tabpane/TabPane";
import ConstraintsMenu from "@/interface/Menu/constraints/ConstraintsMenu";
import {artificialBasisMethod} from "@/core/algorithms/simplex/artificial";

function App() {
    const dispatch = useAppDispatch()

    const items = React.useMemo(
        () => {
            return [
                {
                    icon: <BiUpload/>,
                    title: 'Загрузить из файла',
                    action: () => {
                        console.log('test')
                    }
                },
                {
                    icon: <BiDownload/>,
                    title: 'Сохранить в файл',
                    action: () => {
                        console.log('test 2')
                    }
                }
            ]
        }, []
    )

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
                }
            ]
        },
        []
    )

    const action = () => {
        const tf1 = new TargetFunction(
            Polynomial.fromNumbersArray([-1, 10, -1]), ExtremumType.MAXIMUM
        )
        const constraints = [
            new Equation(Polynomial.fromNumbersArray([-1, 5, 7]), 13),
            new Equation(Polynomial.fromNumbersArray([1, 14.5, 7]), 15),
        ]

        // simplexMethod(tf1, constraints, [0, 1, 2])
        artificialBasisMethod(tf1, constraints)
    }

    return (
        <div className="App">
            <TabPane tabs={tabs}/>
            <button
                type="button"
                onClick={() => action()}
            >
                Test
            </button>
        </div>
    )
}

export default App

import './index.css'
import React from "react";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Equation} from "@/core/domain/math/classes/Equation";
import {simplexMethod} from "@/core/algorithms/simplex";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {useAppDispatch} from "@/redux/hooks";
import {setSteps} from "@/redux/slices/SimplexState";
import StepsList from "@/interface/StepsInfo/StepsList";
import Menu from "@/interface/Menu/Menu";
import {BiDownload, BiUpload} from "react-icons/all";

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

    const action = () => {
        const tf1 = new TargetFunction(
            Polynomial.fromNumbersArray([3, -2, 1, 3, 3]), ExtremumType.MAXIMUM
        )
        const constraints = [
            new Equation(Polynomial.fromNumbersArray([2, -1, 1, 1, 1]), 2),
            new Equation(Polynomial.fromNumbersArray([-4, 3, -1, -1, -3]), -4),
            new Equation(Polynomial.fromNumbersArray([3, 2, 3, 5, 0]), 3),
        ]

        simplexMethod(tf1, constraints, [0, 1, 2])
    }

    return (
        <div className="App">
            <Menu items={items}/>
            <div className="centered flex-row gap-2">
                <button
                    type="button"
                    onClick={action}
                >
                    Test
                </button>
                <button
                    type="button"
                    onClick={() => dispatch(setSteps([]))}
                >
                    Reset
                </button>
            </div>
            <StepsList/>
        </div>
    )
}

export default App

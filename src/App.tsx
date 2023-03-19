import './App.scss'
import React from "react";
import Polynomial from "@/core/domain/math/classes/Polynomial";
import {Equation} from "@/core/domain/math/classes/Equation";
import {simplexMethod} from "@/core/algorithms/simplex";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";

function App() {
    const action = () => {
        const tf1 = new TargetFunction(
            Polynomial.fromNumbersArray([-1, 2, 1, -1]), ExtremumType.MINIMUM
        )
        const constraints = [
            new Equation(Polynomial.fromNumbersArray([1, 1, -2, 3]), 1),
            new Equation(Polynomial.fromNumbersArray([2, -1, -1, 3]), 2),
        ]

        simplexMethod(tf1, constraints, [2, 3])
    }

    return (
        <div className="App">
            <h1>Development is going on console</h1>
            <button
                type="button"
                onClick={action}
            >
                Test
            </button>
        </div>
    )
}

export default App

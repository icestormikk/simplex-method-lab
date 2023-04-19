import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import {FractionView} from "@/core/domain/math/enums/FractionView";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Equation} from "@/core/domain/math/classes/Equation";
import Polynomial from "@/core/domain/math/classes/Polynomial";

interface MainState {
    targetFunction: TargetFunction,
    constraints: Array<Equation>,
    fractionViewMode: FractionView
}

const initialState: MainState = {
    targetFunction: new TargetFunction(
        Polynomial.fromNumbersArray([0]),
        ExtremumType.MINIMUM
    ),
    constraints: [
        new Equation(
            Polynomial.fromNumbersArray([0]), 0
        )
    ],
    fractionViewMode: FractionView.REAL
}

const mainState = createSlice({
    name: 'mainState',
    initialState,
    reducers: {
        updateTargetFunction: (state, action: PayloadAction<TargetFunction>) => {
            const targetFunction = action.payload
            if (targetFunction) {
                state.targetFunction = new TargetFunction(
                    new Polynomial(
                        [...targetFunction.func.coefficients],
                        targetFunction.func.constant
                    ),
                    targetFunction.extremumType
                )
            }
        },
        updateConstraintsList: (state, action: PayloadAction<Array<Equation>>) => {
            const constraints = action.payload
            if (constraints && constraints.length > 0) {
                state.constraints = [...constraints]
            }
        },
        updateFractionViewMode: (state, action: PayloadAction<FractionView>) => {
            const fractionView = action.payload
            if (fractionView) {
                state.fractionViewMode = fractionView
            }
        },
        dropState: (state) => {
            state.targetFunction = initialState.targetFunction
            state.fractionViewMode = initialState.fractionViewMode
            state.constraints.splice(
                0,
                state.constraints.length,
                new Equation(
                    Polynomial.fromNumbersArray([0]), 0
                )
            )
        }
    }
})

export const mainStateReducer = mainState.reducer
export const {
    updateTargetFunction,
    updateConstraintsList,
    updateFractionViewMode,
    dropState
} = mainState.actions

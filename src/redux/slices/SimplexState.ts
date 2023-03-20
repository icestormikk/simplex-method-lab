import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import SimplexMatrix from "@/core/domain/math/classes/simplex/SimplexMatrix";

type SimplexStepInfo = {
    simplexSnapshot: SimplexMatrix,
    bearingElement: {
        row: number,
        column: number
    }
}

interface SimplexState {
    steps: Array<SimplexStepInfo>
}

const initialState: SimplexState = {
    steps: []
}

const simplexSlice = createSlice({
    name: 'simplexState',
    initialState,
    reducers: {
        addStep: (state, action: PayloadAction<SimplexStepInfo>) => {
            state.steps.push(action.payload)
        },
        setSteps: (state, action: PayloadAction<Array<SimplexStepInfo>>) => {
            state.steps = action.payload
        }
    }
})

export const simplexReducer = simplexSlice.reducer
export const {
    addStep, setSteps
} = simplexSlice.actions

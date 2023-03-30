import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SimplexStepInfo} from "@/interface/types/SimplexStepInfo";

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
        },
        clearSteps: (state) => {
            state.steps.splice(0, state.steps.length)
        }
    }
})

export const simplexReducer = simplexSlice.reducer
export const {
    addStep, setSteps, clearSteps
} = simplexSlice.actions

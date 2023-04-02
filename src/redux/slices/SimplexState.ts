import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SimplexStepInfo} from "@/interface/types/SimplexStepInfo";
import {SimplexStepTag} from "@/core/domain/math/enums/SimplexStepTag";

export type AdditionalContentType = {
    calculations: Array<string>,
    tags: Array<SimplexStepTag>
}

interface SimplexState {
    steps: Array<SimplexStepInfo<AdditionalContentType>>
}

const initialState: SimplexState = {
    steps: []
}

const simplexSlice = createSlice({
    name: 'simplexState',
    initialState,
    reducers: {
        addStep: (
            state,
            action: PayloadAction<SimplexStepInfo<AdditionalContentType>>
        ) => {
            state.steps.push(action.payload)
        },
        setSteps: (
            state,
            action: PayloadAction<Array<SimplexStepInfo<AdditionalContentType>>>
        ) => {
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

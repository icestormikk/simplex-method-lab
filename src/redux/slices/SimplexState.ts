import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SimplexStepTag} from "@/core/domain/math/enums/SimplexStepTag";
import {SimplexStepInfo} from "@/interface/domain/types/SimplexStepInfo";
import Coefficient from "@/core/domain/math/classes/Coefficient";

export type AdditionalContentType = {
    calculations: Array<string>,
    tags: Array<SimplexStepTag>
}

interface SimplexState {
    steps: Array<SimplexStepInfo<AdditionalContentType>>
    result?: Array<number>
}

const initialState: SimplexState = {
    steps: [],
    result: undefined
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
            state.steps.splice(0, state.steps.length, ...action.payload)
        },
        clearSteps: (state) => {
            state.steps.splice(0, state.steps.length)
        },
        removeStepsAfterIndex: (state, action: PayloadAction<number>) => {
            state.steps.splice(action.payload, Number.MAX_VALUE)
        },
        setResult: (
            state,
            action: PayloadAction<Array<Coefficient> | undefined>
        ) => {
            state.result = action.payload?.map((el) => el.multiplier)
        }
    }
})

export const simplexReducer = simplexSlice.reducer
export const {
    addStep, setSteps, clearSteps, removeStepsAfterIndex,
    setResult
} = simplexSlice.actions

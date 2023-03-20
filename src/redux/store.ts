import {configureStore} from "@reduxjs/toolkit";
import {simplexReducer} from "@/redux/slices/SimplexState";

export const store = configureStore({
    reducer: {
        simplex: simplexReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
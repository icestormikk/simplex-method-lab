import {configureStore} from "@reduxjs/toolkit";
import {simplexReducer} from "@/redux/slices/SimplexState";
import {mainStateReducer} from "@/redux/slices/MainState";

export const store = configureStore({
    reducer: {
        simplex: simplexReducer,
        main: mainStateReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

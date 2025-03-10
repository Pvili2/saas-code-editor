import { configureStore } from '@reduxjs/toolkit'
import codeReducer from "./reducers/codeStore"
import userSlicer from "./reducers/userStore"
export const makeStore = () => {
  return configureStore({
    reducer: {
        codeReducer,
        userSlicer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionReturnType } from "convex/server";
import { api } from "../../../convex/_generated/api";

const initialState:{_id: string | null, allData: FunctionReturnType<typeof api.users.getUser> | null}= {_id: null, allData:null } 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<{_id: string | null, allData: FunctionReturnType<typeof api.users.getUser> | null}>) => {
            state._id = action.payload._id
            state.allData = action.payload.allData
        }
    }
})

export const {setValue} = userSlice.actions;
export default userSlice.reducer
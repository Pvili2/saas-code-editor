import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_JS_CODE } from "@/static_datas/static";
import { Languages } from "@/types";
const initialState: {value : string | undefined, output: string | undefined, language: Languages,
     previewImg: string, projectTitle: string | undefined} =
      { value:  DEFAULT_JS_CODE, output: undefined, language: Languages.javascript, previewImg: "", projectTitle: undefined, };

const codeSlice = createSlice(
    {
        name: "code",
        initialState,
        reducers:{
            setValue: (state, action: PayloadAction<string>)=> {state.value = action.payload},
            setOutput: (state, action: PayloadAction<string | undefined>) => {state.output = action.payload},
            setLanguage: (state, action: PayloadAction<Languages>) => {state.language = action.payload},
            setPreviewImg: (state, action: PayloadAction<string>) => {state.previewImg = action.payload},
            setProjectTitle: (state, action: PayloadAction<string | undefined>) => {state.projectTitle = action.payload},
        }
    }
)

export const {setValue, setOutput, setLanguage, setPreviewImg, setProjectTitle} = codeSlice.actions;
export default codeSlice.reducer
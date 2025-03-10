import axios from "axios"
import { Languages } from "@/types"
const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const executeCode = async (language:Languages, sourceCode : string)=>{
    const response = await API.post("/execute", {
        "language":language,
        "version": await getLanguageVersion(language),
        "files": [{
            content: sourceCode
        }]
    })

    return response.data
}
export const fetchLanguages = async () =>{
    const response = await API.get("/runtimes")

    return response.data;
}

export const getLanguageVersion = async (language : string) =>{
    const langs =await fetchLanguages()

    return langs.find(x => x.language === language).version
}
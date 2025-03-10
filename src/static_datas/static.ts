import { Languages } from "@/types";

export const DEFAULT_JS_CODE = `console.log("Hello")
    for (let i = 0; i < 10; i++){
        console.log(i)
    }
`

export const LANGUAGE_VERSIONS:Record<Languages, string> = {
    [Languages.javascript]: "18.15.0",
    [Languages.typescript]: "5.0.3",
    [Languages.python]: "3.10.0",
    [Languages.java]: "15.0.2",
    [Languages.csharp]: "6.12.0",
    [Languages.php]: "8.2.3",
  };
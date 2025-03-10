import { FunctionReturnType } from "convex/server";
import { api } from "../convex/_generated/api";
import { RefObject } from "react";
export type UserProps = {
    _id: string;
    allData: FunctionReturnType<typeof api.users.getUser>
} 

export interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    canvasRef?: RefObject<HTMLDivElement>,
    setIsSuccessSave?: React.Dispatch<React.SetStateAction<boolean>>
  }

export enum Languages {
    javascript = "javascript",
    typescript="typescript",
    python="python",
    java="java",
    csharp="csharp",
    php="php"
}
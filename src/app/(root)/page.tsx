"use client"
import EditorPanel from "@/app/(root)/_components/EditorPanel";
import OutputPanel from "@/app/(root)/_components/OutputPanel";
import RunBar from "./_components/RunBar";
import { useRef } from "react";

export default function Home() {

  const toCanvas = useRef<HTMLDivElement>(null);


  console.log(toCanvas)
  return (
    <div className="min-h-screen">
        <div className=" h-[600px] flex flex-row  justify-around min-w-screen gap-3">
          <EditorPanel canvasRef={toCanvas} >
            <RunBar canvasRef={toCanvas}/>
          </EditorPanel>
          <OutputPanel />
        </div>
      </div>
  );
}

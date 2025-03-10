"use client"
import { RootState } from '@/lib/store'
import React from 'react'
import ReactTerminal from 'react-terminal-ui';
import { useSelector } from 'react-redux';

export default function OutputPanel() {
  const out = useSelector((state: RootState) => state.codeReducer.output)
  return (
    <div>
        <div className='h-16 flex justify-between items-center'>
        OutputPanel
        </div>
      <div className="w-full lg:w-[700px] bg-gray-900 rounded-lg overflow-hidden shadow-xl">

      <ReactTerminal 
        colorMode={1}
        height="65vh"
      >
          {out?.split("\n").map((item,key)=>{
            return <p key={key}>{item}</p>
          })}
      </ReactTerminal>
      </div>
    </div>
  )
}
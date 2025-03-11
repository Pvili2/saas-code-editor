"use client"
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setValue } from '@/lib/reducers/codeStore'
import { RootState } from '@/lib/store'
import { Flex } from 'antd'
import { setOutput } from '@/lib/reducers/codeStore'
import { executeCode } from './output_api'
import DontProModal from './DontProModal'
import LanguageSelector from './LanguageSelector'
import ProModal from "./ProModal"
import { RefObject } from 'react'
import {ToastContainer, toast, Bounce} from 'react-toastify'

function RunBar({canvasRef}: {canvasRef: RefObject<HTMLDivElement>}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProModalOpen, setIsProModalOpen] = useState(false);
    const [isSuccessSave, setIsSuccessSave] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.userSlicer.allData)
    const code = useSelector((state: RootState) => state.codeReducer.value)
    const language = useSelector((state :RootState) => state.codeReducer.language)
    const onSave = () => {
        if (!user?.isPro) {
          setIsProModalOpen(true);
        }else {
            setIsModalOpen(true);
            setIsProModalOpen(false);
        }
    }

    
     const runCode = async ()=>{
         console.log(code)
        if(code){
          try {
            const output= await executeCode(language, code)
    
            const outputResult = output["run"]["stdout"]
            if(outputResult){
              dispatch(setOutput(outputResult))
            }
          } catch (error) {
            console.error(error)
          }
        }
      }

      //run toast
      useEffect(() => {
          if(isSuccessSave){
            toast.success("Project saved successfully")
            setIsSuccessSave(false)
          }
      }, [isSuccessSave])
    return (
    <div className='text-white'>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        draggable
        theme="dark"
        transition={Bounce}
        />
        <Flex vertical gap="middle" align='flex-start'>
        <DontProModal 
            open={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
      />
        <ProModal setIsSuccessSave={setIsSuccessSave} canvasRef={canvasRef} open={isProModalOpen} onClose={() => setIsProModalOpen(false)} />
        </Flex>
        <div className='h-14 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
            <button onClick={runCode} className='bg-slate-700 hover:border hover:border-white hover:bg-color-rgb(14,18,27) text-white font-bold py-2 px-4 rounded'>
                Run
            </button>
            <button onClick={() => dispatch(setValue(""))} className='bg-slate-700 hover:border hover:border-white hover:bg-color-rgb(14,18,27) text-white font-bold py-2 px-4 rounded'>
                Clear
            </button>
            </div>
            <div className='flex items-center gap-3'>
             <LanguageSelector/>
            </div>
            <div className='flex items-center gap-3'>
            <button onClick={() => onSave()} className='bg-slate-700 hover:border hover:border-white hover:bg-color-rgb(14,18,27) text-white font-bold py-2 px-4 rounded'>
                Save
            </button>
            <button className='bg-slate-700 hover:border hover:border-white hover:bg-color-rgb(14,18,27) text-white font-bold py-2 px-4 rounded'>
                Load
            </button>
            </div>
        </div>    
    </div>
  )
}

export default RunBar
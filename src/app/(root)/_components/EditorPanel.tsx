"use client"
import React, { useRef } from 'react'
import {Editor} from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setValue } from '@/lib/reducers/codeStore';
import { RefObject } from 'react'

export default function EditorPanel({children, canvasRef}:{children: React.ReactNode, canvasRef: RefObject<HTMLDivElement> }) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const dispatch = useDispatch()
  const code = useSelector((state: RootState) => state.codeReducer.value)  
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) =>{
    editorRef.current = editor;

    editor.focus();
  }

  return (
    <div
    ref={canvasRef}
    className='pt-2'>
      {children}
      <Editor
        height="80vh"
        width="750px"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={code}
        className='bg-slate-600'
        value={code}
        onChange={(value) => dispatch(setValue(value!))}
        onMount={onMount}
      />
    </div>
  )
}
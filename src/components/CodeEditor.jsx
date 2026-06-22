import React, { useState, useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'

export default function CodeEditor({ value, onChange, readOnly = false }) {
  const editorRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return
    const startState = EditorState.create({
      doc: value || '',
      extensions: [
        basicSetup,
        python(),
        oneDark,
        EditorView.updateListener.of(update => {
          if (update.docChanged && onChange && !readOnly) {
            onChange(update.state.doc.toString())
          }
        }),
        ...(readOnly ? [EditorView.editable.of(false)] : []),
      ],
    })
    viewRef.current = new EditorView({ state: startState, parent: editorRef.current })
    return () => viewRef.current?.destroy()
  }, [])

  useEffect(() => {
    if (viewRef.current && !readOnly) {
      const current = viewRef.current.state.doc.toString()
      if (current !== value) {
        viewRef.current.dispatch({ changes: { from: 0, to: current.length, insert: value || '' } })
      }
    }
  }, [value, readOnly])

  return <div ref={editorRef} className="border border-base-300 rounded-xl overflow-hidden min-h-48" />
}

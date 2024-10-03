import type { Editor, EditorEvents } from '@tiptap/core'
import { useEffect, useRef } from 'react'

export type UseEditorOnEditableUpdateOptions = {
    editor: Editor | null
    callback?: ((props: EditorEvents['update']) => void) | null | undefined
}

export default function useEditorOnEditableUpdate({
    editor,
    callback,
}: UseEditorOnEditableUpdateOptions): void {
    const callbackRef = useRef(callback)
    const isEditableRef = useRef(editor?.isEditable)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const hasCallback = !!callback
    useEffect(() => {
        if (!editor || editor.isDestroyed || !hasCallback) {
            return
        }

        isEditableRef.current = editor.isEditable

        function handleUpdate(props: EditorEvents['update']) {
            if (
                !editor ||
                editor.isDestroyed ||
                editor.isEditable === isEditableRef.current
            ) {
                return
            }

            // The editable state has changed!
            isEditableRef.current = editor.isEditable
            callbackRef.current?.(props)
        }

        editor.on('update', handleUpdate)

        return () => {
            editor.off('update', handleUpdate)
        }
    }, [editor, hasCallback])
}

import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import MenuBar from './MenuBar'
import { extensions } from '@/constants/tiptatExtensions'
import type { Editor as TiptapEditor } from '@tiptap/react'

interface Props {
    onDataChange?: (json: any) => void
    onEditorReady?: (editor: TiptapEditor) => void
    content: any
    editable: any
}

const Editor = ({ onDataChange, onEditorReady, content, editable }: Props) => {
    const editor = useEditor({
        editable,
        extensions,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
            }
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            onDataChange?.(json)
        },
        content
    })

    useEffect(() => {
        if (editor) onEditorReady?.(editor)
    }, [editor, onEditorReady])

    return (
        <div className="w-full relative">
            {editable && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor

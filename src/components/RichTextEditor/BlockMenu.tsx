import React from 'react'
import {
    AiOutlineClose,
    AiOutlineEnter,
    AiOutlineOrderedList,
    AiOutlineRedo,
    AiOutlineUndo,
    AiOutlineUnorderedList,
} from 'react-icons/ai'
import { BiParagraph } from 'react-icons/bi'
import { MdOutlineLayersClear } from 'react-icons/md'
import { PiCodeBlock, PiQuotes } from 'react-icons/pi'
import { TbSpacingVertical } from 'react-icons/tb'
import type { Editor as TiptapEditor } from '@tiptap/react'

interface BlockMenuProps {
    editor: TiptapEditor
}
//TODO : Refactor block menu

const BlockMenu: React.FC<BlockMenuProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }
    const chain = editor.chain().focus()

    return (
        <>
            <button onClick={() => chain.unsetAllMarks().run()} className="editor-btn">
                <MdOutlineLayersClear />
            </button>
            <button onClick={() => chain.clearNodes().run()} className="editor-btn">
                <AiOutlineClose />
            </button>
            <button
                onClick={() => chain.setParagraph().run()}
                className={`editor-btn ${editor.isActive('paragraph') ? 'active-editor-btn' : ''}`}
            >
                <BiParagraph />
            </button>
            <button
                onClick={() => chain.toggleBulletList().run()}
                className={`editor-btn ${editor.isActive('bulletList') ? 'active-editor-btn' : ''}`}
            >
                <AiOutlineUnorderedList />
            </button>
            <button
                onClick={() => chain.toggleOrderedList().run()}
                className={`editor-btn ${editor.isActive('orderedList') ? 'active-editor-btn' : ''}`}
            >
                <AiOutlineOrderedList />
            </button>
            <button
                onClick={() => chain.toggleCodeBlock().run()}
                className={`editor-btn ${editor.isActive('codeBlock') ? 'active-editor-btn' : ''}`}
            >
                <PiCodeBlock />
            </button>
            <button
                onClick={() => chain.toggleBlockquote().run()}
                className={`editor-btn ${editor.isActive('blockquote') ? 'active-editor-btn' : ''}`}
            >
                <PiQuotes />
            </button>
            <button onClick={() => chain.setHorizontalRule().run()} className="editor-btn">
                <TbSpacingVertical />
            </button>
            <button onClick={() => chain.setHardBreak().run()} className="editor-btn">
                <AiOutlineEnter />
            </button>
            <button
                onClick={() => chain.undo().run()}
                disabled={!chain.undo().run()}
                className="editor-btn"
            >
                <AiOutlineUndo />
            </button>
            <button
                onClick={() => chain.redo().run()}
                disabled={!chain.redo().run()}
                className="editor-btn"
            >
                <AiOutlineRedo />
            </button>
        </>
    )
}

export default BlockMenu

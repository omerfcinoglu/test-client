import { headingConfigs, markCommands } from "@/config/TipTapMenuBar";
import {
    AiOutlineClose,
    AiOutlineEnter,
    AiOutlineOrderedList,
    AiOutlineRedo,
    AiOutlineUndo,
    AiOutlineUnorderedList,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
} from "react-icons/ai";
import { BiParagraph } from "react-icons/bi";
import { MdOutlineLayersClear } from "react-icons/md";
import { PiCodeBlock, PiQuotes, PiTextAlignJustify } from "react-icons/pi";
import { TbSpacingVertical } from "react-icons/tb";
import type { Editor as TiptapEditor } from '@tiptap/react'
import Divider from "../Divider";

interface MenuBarProps {
    editor: TiptapEditor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
        return null;
    }

    return (
        //TODO : Refactor block menu
        <div className="border border-slate-300 rounded-lg p-5 sticky top-3 left-0 right-0 bg-white z-10 flex gap-1 flex-wrap">
            <input
                type="color"
                onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value ?? "").run()}
                value={editor.getAttributes('textStyle').color}
            />

            <Divider />

            {headingConfigs.map(({ level, weight }) => (
                <button
                    key={`h${level}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    className={`editor-btn ${weight} ${editor.isActive("heading", { level }) ? "active-editor-btn" : ""
                        }`}
                >
                    H{level}
                </button>
            ))}

            <Divider />

            {markCommands.map(({ cmd, icon, check }) => {
                const isActive = editor.isActive(check)
                const can = editor.can().chain().focus()[cmd]().run()
                return (
                    <button
                        key={cmd}
                        onClick={() => editor.chain().focus()[cmd]().run()}
                        disabled={!can}
                        className={`editor-btn ${isActive ? "active-editor-btn" : ""}`}
                    >
                        {icon}
                    </button>
                )
            })}
            <button
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                className={`editor-btn`}
            >
                <MdOutlineLayersClear />
            </button>
            <button
                onClick={() => editor.chain().focus().clearNodes().run()}
                className={`editor-btn`}
            >
                <AiOutlineClose />
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`editor-btn ${editor.isActive("paragraph") && "active-editor-btn"
                    }`}
            >
                <BiParagraph />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`editor-btn ${editor.isActive("bulletList") && "active-editor-btn"
                    }`}
            >
                <AiOutlineUnorderedList />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`editor-btn ${editor.isActive("orderedList") && "active-editor-btn"
                    }`}
            >
                <AiOutlineOrderedList />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`editor-btn ${editor.isActive("codeBlock") && "active-editor-btn"
                    }`}
            >
                <PiCodeBlock />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`editor-btn ${editor.isActive("blockquote") && "active-editor-btn"
                    }`}
            >
                <PiQuotes />
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={`editor-btn`}
            >
                <TbSpacingVertical />
            </button>
            <button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={`editor-btn`}
            >
                <AiOutlineEnter />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={`editor-btn`}
            >
                <AiOutlineUndo />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={`editor-btn`}
            >
                <AiOutlineRedo />
            </button>

            <Divider />

            <div className="button-group flex gap-2">
                <button
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={`editor-btn ${editor.isActive({ textAlign: "left" }) ? "active-editor-btn" : ""}`}
                >
                    <AiOutlineAlignLeft />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`editor-btn ${editor.isActive({ textAlign: "center" }) ? "active-editor-btn" : ""}`}
                >
                    <AiOutlineAlignCenter />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`editor-btn ${editor.isActive({ textAlign: "right" }) ? "active-editor-btn" : ""}`}
                >
                    <AiOutlineAlignRight />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className={`editor-btn ${editor.isActive({ textAlign: "justify" }) ? "active-editor-btn" : ""}`}
                >
                    <PiTextAlignJustify />
                </button>

                <button
                    onClick={() => editor.chain().focus().unsetTextAlign().run()}
                    className="editor-btn"
                >
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    )
};

export default MenuBar;
import { Color } from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'

export const extensions = [
    Heading.configure({}),
    StarterKit.configure({}),
    TextStyle.configure({}),
    Color.configure({
        types: ['textStyle'],
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Image,
    ImageResize,
]
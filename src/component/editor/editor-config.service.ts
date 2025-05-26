import { useState } from 'react'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'
import { getMarkRange, Range, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
interface options {
    placeholder?: string
    onUpdate?: any
    content?: string | any
    editable?: boolean
}

const useEditorConfig = ({
    placeholder,
    onUpdate,
    content,
    editable = true,
}: options) => {
    const [selectionRange, setselectionRange] = useState<Range>()
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            FontFamily,
            TextStyle,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'mx-auto',
                },
            }),
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: '',
                },
            }),
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: 'mx-auto rounded-sm',
                },
            }),

            Placeholder.configure({
                placeholder: placeholder || 'Type Something...',
            }),
        ],
        onUpdate: onUpdate,
        editorProps: {
            handleClick(view, pos, event) {
                const { state } = view
                const selectionRange = getMarkRange(
                    state.doc.resolve(pos),
                    state.schema.marks.link,
                )
                if (selectionRange) setselectionRange(selectionRange)
            },
            attributes: {
                class: 'max-w-full mx-auto h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none mb-0',
            },
        },
        content: content,
        editable: editable,
    })
    return { editor, selectionRange }
}

export default useEditorConfig

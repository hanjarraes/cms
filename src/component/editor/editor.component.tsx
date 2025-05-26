import { EditorContent, Editor } from '@tiptap/react'
import Toolbar from './toolbar/toolbar.component'
import { useField, useFormikContext } from 'formik'
import useEditorConfig from './editor-config.service'
import { useEffect } from 'react'
type IRichTextEditor = {
    hideError?: boolean
    name: string
    className?: string
}

const RichTextEditor = ({
    hideError = false,
    name,
    className,
}: IRichTextEditor) => {
    const [field, meta] = useField(name)
    const { setFieldValue, setFieldTouched } = useFormikContext<any>()

    const isError = meta.touched && meta.error

    const handleOnChangeContent = ({ editor }: { editor: Editor }) => {
        const newContent = editor.getHTML()
        setFieldValue(name, newContent)
        setFieldTouched(name, true, false)
    }

    const { editor, selectionRange } = useEditorConfig({
        placeholder: 'Enter here',
        onUpdate: handleOnChangeContent,
        content: field.value,
    })

    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange)
        }
    }, [editor, selectionRange])

    return (
        <div className={`${className} flex flex-col`}>
            <div className="border-b p-2 shrink-0">
                <Toolbar editor={editor} />
            </div>
            <div className="p-2 overflow-auto grow">
                <EditorContent
                    editor={editor}
                    className="h-full min-h-[100px]"
                />
            </div>
            {!hideError && isError && (
                <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )}
        </div>
    )
}

export default RichTextEditor

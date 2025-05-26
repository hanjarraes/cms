import { EditorContent } from '@tiptap/react'
import useEditorConfig from './editor-config.service'

const EditorViewer = ({ content }: { content: string | any }) => {
    const { editor } = useEditorConfig({
        content: content,
        editable: false,
    })

    return (
        <div className="bg-[#f3f8ff] border rounded-md w-full min-w-[600px] p-4">
            <EditorContent
                editor={editor}
                className="min-h-[720px] dark:text-secondary"
            />
        </div>
    )
}

export default EditorViewer

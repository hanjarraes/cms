import { useLinkTextFormValidation } from './link-text-validation'
import { useFormik } from 'formik'
import { IFLinkText } from './link-text.interface'
import { Editor } from '@tiptap/react'

const useLinkText = ({ editor }: { editor: Editor }) => {
    const validation = useLinkTextFormValidation()

    const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        ' ',
    )

    const formik = useFormik<IFLinkText>({
        validationSchema: validation.schema,
        initialValues: {
            ...validation.initialValues,
            text_display: selectedText || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const hasSelection = !editor.state.selection.empty
            const displayText = values.text_display
            const url = values.url

            if (!hasSelection && displayText) {
                const fromPos = editor.state.selection.from

                editor
                    .chain()
                    .focus()
                    .insertContent(displayText)
                    .setTextSelection({
                        from: fromPos,
                        to: fromPos + displayText.length,
                    })
                    .extendMarkRange('link')
                    .setLink({
                        href: url,
                        target: '_blank',
                    })
                    .run()
            } else {
                editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .setLink({
                        href: url,
                        target: '_blank',
                    })
                    .run()
            }
        },
    })

    return {
        formik,
    }
}

export default useLinkText

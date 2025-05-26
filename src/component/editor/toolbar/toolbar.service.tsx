import { Editor } from '@tiptap/react'
import { useModal } from 'component/modal/modal.service'

const useToolbar = () => {
    const addEDocModalService = useModal()
    const linkTextModalService = useModal()

    const getFocusedEditor = (editor: Editor) => editor.chain().focus()

    const getDDLabel = (editor: Editor): string => {
        if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
        if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
        if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
        return 'Paragraph'
    }

    const handleEmbedYoutube = (url: string, editor: Editor) => {
        editor.chain().focus().setYoutubeVideo({ src: url }).run()
    }

    const getHeaderStyle = (editor: Editor) => [
        {
            icon: '',
            label: 'Header 1',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
            className: 'text-[1.5rem]',
        },
        {
            icon: '',
            label: 'Header 2',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
            className: 'text-[1.4rem]',
        },
        {
            icon: '',
            label: 'Header 3',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
            className: 'text-[1.3rem]',
        },
        {
            icon: '',
            label: 'Header 4',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 4 }).run(),
            className: 'text-[1.2rem]',
        },
        {
            icon: '',
            label: 'Header 5',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 5 }).run(),
            className: 'text-[1.1rem]',
        },
        {
            icon: '',
            label: 'Header 6',
            onClick: () =>
                getFocusedEditor(editor).toggleHeading({ level: 6 }).run(),
            className: 'text-[1rem]',
        },
    ]

    const getHeaderOthers = (editor: Editor) => [
        {
            icon: '',
            label: 'IMAGE',
            onClick: () => addEDocModalService.openModalHandling(),
        },
        // {
        //     icon: '',
        //     label: 'TABLE',
        //     onClick: () =>
        //         getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
        // },
        {
            icon: '',
            label: 'LINK',
            onClick: () => linkTextModalService.openModalHandling(),
        },
    ]

    const getHeaderAlignments = (editor: Editor) => [
        {
            icon: 'align-left',
            label: '',
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
        },
        {
            icon: 'align-center',
            label: '',
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
        },
        {
            icon: 'align-right',
            label: '',
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
        },
    ]

    const getFontFamilyOptions = (editor: Editor) => [
        {
            icon: '',
            label: 'Default',
            onClick: () => editor.chain().focus().unsetFontFamily().run(),
            className: '',
            isDefault: true,
        },
        {
            icon: '',
            label: 'Sans-serif',
            onClick: () =>
                editor.chain().focus().setFontFamily('sans-serif').run(),
            className: '',
        },
        {
            icon: '',
            label: 'Monospace',
            onClick: () =>
                editor.chain().focus().setFontFamily('monospace').run(),
            className: '',
        },
        {
            icon: '',
            label: 'Cursive',
            onClick: () =>
                editor.chain().focus().setFontFamily('cursive').run(),
            className: '',
        },
        {
            icon: '',
            label: 'Fantasy',
            onClick: () =>
                editor.chain().focus().setFontFamily('fantasy').run(),
            className: '',
        },
    ]

    return {
        addEDocModalService,
        linkTextModalService,
        getFontFamilyOptions,
        getHeaderStyle,
        getHeaderOthers,
        getHeaderAlignments,
        getDDLabel,
        handleEmbedYoutube,
        getFocusedEditor,
    }
}

export default useToolbar

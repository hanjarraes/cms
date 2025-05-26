import { Editor } from '@tiptap/react'

export interface IButton {
    editor: Editor | null
    command: () => void
    iconClass: string
    isActive: boolean
}

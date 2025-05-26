import { Editor } from '@tiptap/react'
import { useModal } from 'component/modal/modal.service'
import { Toast } from 'component/toast/toast.component'
import { useRef, useState } from 'react'

interface UploadProps {
    editor: Editor
    allowedFileTypes?: string[]
}

const useUpload = ({
    editor,
    allowedFileTypes = ['.png', '.jpg', '.jpeg'],
}: UploadProps) => {
    const addEDocModalService = useModal()
    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const validateFile = (file: File): boolean => {
        let messageError
        const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase()

        if (!allowedFileTypes.includes(`.${fileExtension}`)) {
            messageError = `Only ${allowedFileTypes.join(', ')} files are allowed.`
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            messageError = 'File size exceeds 5MB limit.'
        }

        if (messageError) {
            Toast({
                header: 'Error Selected File',
                message: messageError,
                type: 'error',
            })
            return false
        }
        return true
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (validateFile(file)) {
                setSelectedFile(file)
            } else {
                if (inputRef.current) inputRef.current.value = ''
            }
        }
    }

    const onChooseFile = () => {
        if (inputRef.current) inputRef.current.click()
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0]
            if (validateFile(file)) {
                setSelectedFile(file)
            }
        }
    }

    const submitUploadFile = async () => {
        if (!selectedFile) return

        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
        const isImage = ['.png', '.jpg', '.jpeg'].includes(`.${fileExtension}`)

        if (isImage) {
            const localImageUrl = URL.createObjectURL(selectedFile)
            editor.chain().focus().setImage({ src: localImageUrl }).run()
        } else {
            Toast({
                header: 'File Selected',
                message: `File "${selectedFile.name}" is ready for processing.`,
                type: 'info',
            })
        }

        setSelectedFile(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    return {
        addEDocModalService,
        handleFileChange,
        onChooseFile,
        handleDragOver,
        handleDrop,
        selectedFile,
        inputRef,
        submitUploadFile,
    }
}

export default useUpload

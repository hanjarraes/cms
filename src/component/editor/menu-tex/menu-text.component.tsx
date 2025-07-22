import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const MenuBar = ({ editor }: { editor: any }) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (!editor) return;

            acceptedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onload = () => {
                    const result = reader.result as string;

                    if (file.type.startsWith('image/')) {
                        editor.chain().focus().setImage({ src: result }).run();
                    } else {
                        const url = URL.createObjectURL(file);
                        editor.chain().focus().insertContent(
                            `<a href="${url}" target="_blank" rel="noopener noreferrer">${file.name}</a>`
                        ).run();
                    }
                };

                reader.readAsDataURL(file);
            });
        },
        [editor]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    if (!editor) return null;

    const iconBtn = (
        cmd: () => void,
        isActive: boolean,
        icon: string,
        label: string
    ) => (
        <button
            onClick={cmd}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
        >
            <i className={`ri-${icon}`}></i>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="menu-bar flex flex-wrap gap-2 border-b pb-2 mb-3">
            {iconBtn(() => editor.chain().focus().toggleBold().run(), editor.isActive('bold'), 'bold', 'Bold')}
            {iconBtn(() => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'), 'italic', 'Italic')}
            {iconBtn(() => editor.chain().focus().toggleItalic().run(), editor.isActive('underline'), 'underline', 'underline')}
            <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active' : ''}>S</button>
            {iconBtn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive('heading', { level: 1 }), 'h-1', 'H1')}
            {iconBtn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }), 'h-2', 'H2')}
            {iconBtn(() => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'), 'list-unordered', 'Bullet')}
            {iconBtn(() => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'), 'list-ordered', 'Number')}

            <div
                {...getRootProps()}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-green-500 text-white cursor-pointer hover:bg-green-600"
            >
                <input {...getInputProps()} />
                <i className="ri-upload-cloud-line"></i>
                <span className="hidden sm:inline">Upload</span>
            </div>
        </div>
    );
};

export default MenuBar;

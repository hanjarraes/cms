import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

import './text-editor.style.css';
import MenuBar from './menu-tex/menu-text.component';

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Hello, saat nya mulai bikin soal</p>',
  });

  return (
    <div className="editor-container h-full overflow-y-scroll">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default TextEditor;

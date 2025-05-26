import { FC } from 'react'
import { Editor } from '@tiptap/react'
import useToolbar from './toolbar.service'
import './toolbar.style.css'
import ButtonPopUp from './button-popup/button-popup.component'
import Button from './button/button.component'
import AddEDocumentModal from './modal/upload-image/upload-image.component'
import LinkTextModal from './modal/link-text/link-text.component'

interface ToolbarProps {
    editor: Editor | null
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
    const {
        addEDocModalService,
        linkTextModalService,
        getFocusedEditor,
        getHeaderStyle,
        getHeaderOthers,
        getHeaderAlignments,
        getFontFamilyOptions,
    } = useToolbar()

    if (!editor) return null

    const styleItems = getHeaderStyle(editor)
    const othersItems = getHeaderOthers(editor)
    const FontFamilyItems = getFontFamilyOptions(editor)
    const alignmentsItems = getHeaderAlignments(editor)

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-row">
                <ButtonPopUp
                    iconButton="ri-t-box-line"
                    positionPopup="bottom"
                    items={styleItems}
                    position="left"
                    tooltip="Style"
                    id="style-button"
                />
            </div>

            <div className="flex flex-row divide-custom toolbar-button">
                <Button
                    editor={editor}
                    command={() => getFocusedEditor(editor).toggleBold().run()}
                    iconClass="ri-bold"
                    isActive={editor?.isActive('bold') || false}
                    tooltip="Bold"
                    id="bold-button"
                />
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleItalic().run()
                    }
                    iconClass="ri-italic"
                    isActive={editor?.isActive('italic') || false}
                    tooltip="Italic"
                    id="italic-button"
                />
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleUnderline().run()
                    }
                    iconClass="ri-underline"
                    isActive={editor?.isActive('underline') || false}
                    tooltip="Underline"
                    id="underline-button"
                />
            </div>

            <div className="flex flex-row">
                <ButtonPopUp
                    defaultLabel="Default"
                    positionPopup="bottom"
                    classNameButton="w-32"
                    items={FontFamilyItems}
                    position="left"
                    tooltip="Font Family"
                    id="font-family-button"
                    useSelectedLabel={true}
                />
            </div>

            <div className="flex flex-row divide-custom toolbar-button">
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleStrike().run()
                    }
                    iconClass="ri-strikethrough"
                    isActive={editor?.isActive('strike') || false}
                    tooltip="Strikethrough"
                    id="strike-button"
                />
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleBlockquote().run()
                    }
                    iconClass="ri-double-quotes-l"
                    isActive={editor?.isActive('blockquote') || false}
                    tooltip="Blockquote"
                    id="blockquote-button"
                />
                <Button
                    editor={editor}
                    command={() => getFocusedEditor(editor).toggleCode().run()}
                    iconClass="ri-code-line"
                    isActive={editor?.isActive('code') || false}
                    tooltip="Inline Code"
                    id="code-button"
                />
            </div>

            <div className="flex flex-row divide-custom toolbar-button">
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleOrderedList().run()
                    }
                    iconClass="ri-list-ordered"
                    isActive={editor?.isActive('orderedList') || false}
                    tooltip="Ordered List"
                    id="ordered-list-button"
                />
                <Button
                    editor={editor}
                    command={() =>
                        getFocusedEditor(editor).toggleBulletList().run()
                    }
                    iconClass="ri-list-unordered"
                    isActive={editor?.isActive('bulletList') || false}
                    tooltip="Unordered List"
                    id="unordered-list-button"
                />
            </div>
            <ButtonPopUp
                variant="horizontal"
                iconButton="ri-align-left"
                positionPopup="bottom"
                items={alignmentsItems}
                position="right"
                tooltip="Alignments"
                id="alignment-button"
                isArrowVisible={true}
            />
            <div className="flex flex-row">
                <ButtonPopUp
                    variant="horizontal"
                    iconButton="ri-more-2-line"
                    positionPopup="bottom"
                    items={othersItems}
                    position="right"
                    tooltip="Style"
                    id="style-button"
                    isArrowVisible={false}
                />
            </div>
            <AddEDocumentModal
                modalService={addEDocModalService}
                editor={editor}
            />
            <LinkTextModal
                modalService={linkTextModalService}
                editor={editor}
            />
        </div>
    )
}

export default Toolbar

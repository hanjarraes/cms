import { FormikProvider } from 'formik'
import useLinkText from './link-text.service'
import { Editor } from '@tiptap/react'
import { IUseModal } from 'component/modal/modal.service'
import Modal from 'component/modal/modal.component'
import Button from 'component/button/button.component'
import FormInput from 'component/form-input/form-input.component'

const LinkTextModal = ({
    modalService,
    editor,
}: {
    modalService: IUseModal
    editor: Editor
}) => {
    const { formik } = useLinkText({ editor })
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3  px-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 flex justify-between">
                    <div>Insert Link</div>
                    <i
                        className="ri-close-fill cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="mx-4">
                    <FormikProvider value={formik}>
                        <FormInput
                            name="text_display"
                            label="Display Text"
                            useUppercaseLabel={true}
                            parentDivClassName="w-full mt-4"
                            placeholder="Enter here"
                        />
                        <FormInput
                            name="url"
                            label="Url"
                            useUppercaseLabel={true}
                            parentDivClassName="w-full mt-4"
                            placeholder="Enter here"
                        />
                    </FormikProvider>
                </div>
                <div className="border-b border-gray-40"></div>
                <Button
                    onClick={() => {
                        formik.submitForm()
                        modalService.closeModalHandling()
                    }}
                    type="submit"
                    label="APPLY"
                    className="mx-2 w-fit ml-auto"
                />
            </div>
        </Modal>
    )
}

export default LinkTextModal

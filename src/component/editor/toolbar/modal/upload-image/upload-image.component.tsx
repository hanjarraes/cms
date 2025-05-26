/* eslint-disable no-unused-vars */
import useUpload from './upload-image.service'
import { IUploadImage } from './upload-image.interface'
import Modal from 'component/modal/modal.component'
import Button from 'component/button/button.component'

const UploadImage = ({ modalService, editor }: IUploadImage) => {
    const {
        inputRef,
        selectedFile,
        handleDragOver,
        handleDrop,
        handleFileChange,
        onChooseFile,
        submitUploadFile,
    } = useUpload({ editor })
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3  px-0">
            <form
                className="flex flex-col gap-4 justify-content"
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log('Submit file:', selectedFile)
                    submitUploadFile()
                }}
            >
                <div className="font-bold text-size-L px-4 flex justify-between">
                    <div>Insert Image</div>
                    <i
                        className="ri-close-fill cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="themes-text-gray-v3 px-4 flex flex-col gap-y-4 w-full overflow-auto ">
                    <input
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                        ref={inputRef}
                        accept=".jpg, .jpeg, .png, .pdf, .xls, .xlsx"
                    />

                    <div
                        style={{
                            border: '2px dashed #BEEDFF',
                        }}
                        className="rounded flex justify-center py-10 bg-[#F6FDFF] cursor-pointer items-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={onChooseFile}
                    >
                        <div className="flex flex-col themes-text-brand-v5">
                            <div className="flex justify-center">
                                <i className="ri-file-upload-line text-[1.5rem] themes-text-brand-v5"></i>
                            </div>
                            <div>Click to upload or drag and drop</div>
                            <div className="text-size-XS flex justify-center ">
                                PNG, JPG, PDF, XLS or XLSX (MAX, 5mb)
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-40"></div>
                <Button
                    onClick={() => {}}
                    type="submit"
                    label="INSERT IMAGE"
                    isDisabled={!selectedFile}
                    className="mx-2 w-fit ml-auto"
                />
            </form>
        </Modal>
    )
}

export default UploadImage

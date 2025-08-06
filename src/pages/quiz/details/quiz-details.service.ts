import { useModal } from "component/modal/modal.service"

const useQuizDetails = () => {

    const modalPreviewPartisipan = useModal()
    const modalPreviewSoal = useModal()

    return {
        modalPreviewPartisipan,
        modalPreviewSoal,
    }
}

export default useQuizDetails
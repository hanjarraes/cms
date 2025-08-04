import { useModal } from "component/modal/modal.service"

const useScheduleDetails = () => {

    const modalPreviewPartisipan = useModal()
    const modalPreviewSoal = useModal()

    return {
        modalPreviewPartisipan,
        modalPreviewSoal,
    }
}

export default useScheduleDetails
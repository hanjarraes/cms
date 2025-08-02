import { useState } from "react"
import { useModal } from "component/modal/modal.service"

const useQuizDetails = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        isDelete,
        setIsDelete,
    }
}

export default useQuizDetails
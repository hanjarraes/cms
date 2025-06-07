import { IStudent, IUseStudent } from "./student.interface"
import { useModal } from '../../component/modal/modal.service'
import { useState } from "react"

const useStudent = (): IUseStudent => {

    const [dataStudent, setDataStudent] = useState<IStudent>({} as IStudent)

    const modalServiceDetails = useModal()
    const modalServiceCreate = useModal()
    
    return {
        modalServiceDetails,
        modalServiceCreate,
        dataStudent, 
        setDataStudent
    }
}

export default useStudent

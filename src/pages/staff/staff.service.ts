import { IFormStaff, IStaff, IUseStaff } from "./staff.interface"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialStaff, schema } from "./staff.validate"

const useStaff = (): IUseStaff => {
    const [dataStaff, setDataStaff] = useState<IStaff | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const reactForm = useForm<IFormStaff>({
        resolver: zodResolver(schema),
        defaultValues: initialStaff,
    });

    useEffect(() => {
  

    }, []);

    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        dataStaff,
        isDelete,
        reactForm,
        setIsDelete,
        setDataStaff,
    }
}

export default useStaff
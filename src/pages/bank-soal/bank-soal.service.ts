import { IFormBankSoal, IBankSoal } from "./bank-soal.interface"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "./bank-soal.validate"
import { useNavigate } from "react-router-dom"
import { useModal } from "component/modal/modal.service"

const useBankSoal = () => {
    const nav = useNavigate()
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [option, setOption] = useState('')
    const modalPreview = useModal()


    const hendleSave = (data: IBankSoal) => {
        setIsConfirm(true);
    }

    const reactForm = useForm<IFormBankSoal>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    return {
        nav,
        isConfirm,
        setIsConfirm,
        option,
        modalPreview,
        setOption,
        isDelete,
        reactForm,
        setIsDelete,
        hendleSave,
    }
}

export default useBankSoal
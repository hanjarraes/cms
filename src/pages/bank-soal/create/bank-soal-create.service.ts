import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IBankSoal, IFormBankSoal, IFormBankQuizSoal } from "../bank-soal.interface"
import { useState } from "react"
import { initialSoal, initialQuizSoal, schema, schemaGroup } from "../bank-soal.validate"
import { useModal } from "component/modal/modal.service"
import { useNavigate } from "react-router-dom"

const useBankSoalCreate = () => {
    const nav = useNavigate()
    const [dataBankSoal, setDataBankSoal] = useState<IBankSoal | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [option, setOption] = useState('')
    const modalServiceExample = useModal()
    const modalServiceQuiz = useModal()

    const reactForm = useForm<IFormBankSoal>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    const reactFormGroup = useForm<IFormBankQuizSoal>({
        resolver: zodResolver(schemaGroup),
        defaultValues: initialQuizSoal,
    });

    return {
        modalServiceExample,
        reactForm,
        option,
        isConfirm,
        modalServiceQuiz,
        reactFormGroup,
        nav,
        setIsConfirm,
        setOption,
        setDataBankSoal
    }
}

export default useBankSoalCreate
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IBankSoal, IFormBankSoal, IFormBankSoalGroup } from "../bank-soal.interface"
import { useState } from "react"
import { initialSoal, initialSoalGroup, schema, schemaGroup } from "../bank-soal.validate"
import { useModal } from "component/modal/modal.service"
import { useNavigate } from "react-router-dom"

const useBankSoalCreate = () => {
    const nav = useNavigate()
    const [dataBankSoal, setDataBankSoal] = useState<IBankSoal | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [option, setOption] = useState('')
    const modalServiceExample = useModal()
    const modalServiceTemplate = useModal()

    const reactForm = useForm<IFormBankSoal>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    const reactFormGroup = useForm<IFormBankSoalGroup>({
        resolver: zodResolver(schemaGroup),
        defaultValues: initialSoalGroup,
    });

    return {
        modalServiceExample,
        reactForm,
        option,
        isConfirm,
        modalServiceTemplate,
        reactFormGroup,
        nav,
        setIsConfirm,
        setOption,
        setDataBankSoal
    }
}

export default useBankSoalCreate
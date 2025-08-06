import { IFormTemplateSoal } from "./template.interface"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "./template.validate"
import { useNavigate } from "react-router-dom"
import { useModal } from "component/modal/modal.service"

const useTemplateSoal = () => {
    const nav = useNavigate()
    const [isDelete, setIsDelete] = useState(false);
    const [option, setOption] = useState('')
    const modalPreview = useModal()

    const reactForm = useForm<IFormTemplateSoal>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    return {
        nav,
        option, 
        setOption,
        isDelete,
        reactForm,
        modalPreview,
        setIsDelete,
    }
}

export default useTemplateSoal
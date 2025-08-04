import { IFormQuizSoal } from "./quiz.interface"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "./quizvalidate"
import { useNavigate } from "react-router-dom"
import { useModal } from "component/modal/modal.service"

const useQuizSoal = () => {
    const nav = useNavigate()
    const [isDelete, setIsDelete] = useState(false);
    const [option, setOption] = useState('')
    const modalPreview = useModal()

    const reactForm = useForm<IFormQuizSoal>({
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

export default useQuizSoal
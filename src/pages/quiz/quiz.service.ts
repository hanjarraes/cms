import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialQuiz, schema } from "./quiz.validate"
import { useNavigate } from "react-router-dom"
import { IFormQuiz, IQuiz, IUseQuiz } from './quiz.interface'

const useQuiz = (): IUseQuiz => {
    const nav = useNavigate()
    const [dataQuiz, setDataQuiz] = useState<IQuiz | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const reactForm = useForm<IFormQuiz>({
        resolver: zodResolver(schema),
        defaultValues: initialQuiz,
    });

    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        dataQuiz,
        isDelete,
        reactForm,
        nav,
        setIsDelete,
        setDataQuiz,
    }
}

export default useQuiz
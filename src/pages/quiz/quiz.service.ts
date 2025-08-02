import { IFormQuiz, IQuiz } from "./quiz"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialQuiz, schema } from "./quiz.validate"
import { useNavigate } from "react-router-dom"

const useQuiz = () => {
    const nav = useNavigate()
    const [dataQuiz, setDataQuiz] = useState<IQuiz | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const reactForm = useForm<IFormQuiz>({
        resolver: zodResolver(schema),
        defaultValues: initialQuiz,
    });

    useEffect(() => {
        if (dataQuiz) {
            reactForm.reset({
                // id: dataQuiz.nim || '',
                // nama: dataQuiz.nama || '',
                // email: dataQuiz.emailPribadi || '',
                // noTelepon: dataQuiz.noTelepon || '',
                // kategori: {
                //     value: dataQuiz.pekerjaan,
                //     label: dataQuiz.pekerjaan
                // },
                // jenisKelamin: dataQuiz.jenisKelamin || '',
            });
        }
    }, [dataQuiz, reactForm]);

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
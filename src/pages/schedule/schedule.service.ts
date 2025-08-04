import { IFormSchedule, ISchedule } from "./schedule"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSchedule, schema } from "./schedule.validate"
import { useNavigate } from "react-router-dom"

const useSchedule = () => {
    const nav = useNavigate()
    const [dataSchedule, setDataSchedule] = useState<ISchedule | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const reactForm = useForm<IFormSchedule>({
        resolver: zodResolver(schema),
        defaultValues: initialSchedule,
    });

    useEffect(() => {
        if (dataSchedule) {
            reactForm.reset({
                // id: dataSchedule.nim || '',
                // nama: dataSchedule.nama || '',
                // email: dataSchedule.emailPribadi || '',
                // noTelepon: dataSchedule.noTelepon || '',
                // kategori: {
                //     value: dataSchedule.pekerjaan,
                //     label: dataSchedule.pekerjaan
                // },
                // jenisKelamin: dataSchedule.jenisKelamin || '',
            });
        }
    }, [dataSchedule, reactForm]);

    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        dataSchedule,
        isDelete,
        reactForm,
        nav,
        setIsDelete,
        setDataSchedule,
    }
}

export default useSchedule
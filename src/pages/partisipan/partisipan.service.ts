import { IFormPartisipan, IPartisipan, IUsePartisipan } from "./partisipan.interface"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialPartisipan, schema } from "./partisipan.validate"

const usePartisipan = (): IUsePartisipan => {
    const [dataPartisipan, setDataPartisipan] = useState<IPartisipan | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const hendleSave = (data: IPartisipan) => {
        modalServiceCreate.closeModalHandling()
        setIsConfirm(true);
    }

    const reactForm = useForm<IFormPartisipan>({
        resolver: zodResolver(schema),
        defaultValues: initialPartisipan,
    });

    useEffect(() => {
        if (dataPartisipan) {
            reactForm.reset({
                id: dataPartisipan.nim || '',
                nama: dataPartisipan.nama || '',
                email: dataPartisipan.emailPribadi || '',
                noTelepon: dataPartisipan.noTelepon || '',
                kategori: dataPartisipan.pekerjaan || '',
                jenisKelamin: dataPartisipan.jenisKelamin || '',
            });
        }
    }, [dataPartisipan, reactForm]);

    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        dataPartisipan,
        isDelete,
        reactForm,
        setIsDelete,
        setDataPartisipan,
        hendleSave,
    }
}

export default usePartisipan
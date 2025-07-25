import { IFormBankSoal, IBankSoal, IUseBankSoal } from "./bank-soal.interface"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "./bank-soal.validate"

const useBankSoal = (): IUseBankSoal => {
    const [dataBankSoal, setDataBankSoal] = useState<IBankSoal | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [option, setOption] = useState('')
    const modalServiceCreate = useModal()

    const hendleSave = (data: IBankSoal) => {
        modalServiceCreate.closeModalHandling()
        setIsConfirm(true);
    }

    const reactForm = useForm<IFormBankSoal>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    // useEffect(() => {
    //     if (dataBankSoal) {
    //         reactForm.reset({
    //             id: dataBankSoal.nim || '',
    //             nama: dataBankSoal.nama || '',
    //             email: dataBankSoal.emailPribadi || '',
    //             noTelepon: dataBankSoal.noTelepon || '',
    //             kategori: dataBankSoal.pekerjaan || '',
    //             jenisKelamin: dataBankSoal.jenisKelamin || '',
    //         });
    //     }
    // }, [dataBankSoal, reactForm]);

    return {
        isConfirm,
        setIsConfirm,
        option,
        setOption,
        modalServiceCreate,
        dataBankSoal,
        isDelete,
        reactForm,
        setIsDelete,
        setDataBankSoal,
        hendleSave,
    }
}

export default useBankSoal
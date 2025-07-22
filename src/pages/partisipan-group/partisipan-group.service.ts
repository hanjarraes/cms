import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IFormPartisipanGroup, IPartisipanGroup, IUsePartisipanGroup } from './partisipan-group.interface';
import { initialPartisipanGroup, schema } from './partisipan-group.validate';

const usePartisipanGroup = (): IUsePartisipanGroup => {
    const [dataPartisipanGroup, setDataPartisipanGroup] = useState<IPartisipanGroup | null>(null)
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const modalServiceCreate = useModal()

    const hendleSave = (data: IPartisipanGroup) => {
        modalServiceCreate.closeModalHandling()
        setIsConfirm(true);
    }

    const reactForm = useForm<IFormPartisipanGroup>({
        resolver: zodResolver(schema),
        defaultValues: initialPartisipanGroup,
    });


    useEffect(() => {
        if (dataPartisipanGroup) {
            reactForm.reset({
                title: '',
                desc: '',
            });
        }
    }, [dataPartisipanGroup, reactForm]);


    return {
        isConfirm,
        setIsConfirm,
        modalServiceCreate,
        dataPartisipanGroup,
        isDelete,
        reactForm,
        setIsDelete,
        setDataPartisipanGroup,
        hendleSave,
    }
}

export default usePartisipanGroup
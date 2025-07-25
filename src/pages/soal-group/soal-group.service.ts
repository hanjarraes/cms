import { IFormSoalGroup, ISoalGroup, IUseSoalGroup } from "./soal-group.interface"
import { useModal } from '../../component/modal/modal.service'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "./soal-group.validate"
import { useNavigate } from "react-router-dom"

const useSoalGroup = (): IUseSoalGroup => {
    const nav = useNavigate()
    const [dataSoalGroup, setDataSoalGroup] = useState<ISoalGroup | null>(null)
    const [isDelete, setIsDelete] = useState(false);
    const [option, setOption] = useState('')

    const reactForm = useForm<IFormSoalGroup>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });

    return {
        nav,
        option, 
        setOption,
        dataSoalGroup,
        isDelete,
        reactForm,
        setIsDelete,
        setDataSoalGroup,
    }
}

export default useSoalGroup
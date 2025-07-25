import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "../soal-group.validate"
import { useModal } from "component/modal/modal.service"
import { IFormSoalGroup, IUseSoalGroupCreate } from "../soal-group.interface"

const useSoalGroupCreate = (): IUseSoalGroupCreate => {
    const [isConfirm, setIsConfirm] = useState(false);

    const reactForm = useForm<IFormSoalGroup>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });


    return {
        isConfirm,
        setIsConfirm,
        reactForm,
    }
}

export default useSoalGroupCreate
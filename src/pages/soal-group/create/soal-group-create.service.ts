import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "../soal-group.validate"
import { IFormSoalGroup } from "../soal-group.interface"
import { ISteps } from "component/progression-step/progression-step.interface"
import { stepForm } from "../soal-group.dummy"

const useSoalGroupCreate = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isStep, setIsStep] = useState<ISteps>(stepForm[0])

    const reactForm = useForm<IFormSoalGroup>({
        resolver: zodResolver(schema),
        defaultValues: initialSoal,
    });


    return {
        isStep,
        setIsStep,
        isConfirm,
        setIsConfirm,
        reactForm,
    }
}

export default useSoalGroupCreate
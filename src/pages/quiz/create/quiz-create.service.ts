import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { initialSoal, schema } from "../quizvalidate"
import { IFormQuizSoal } from "../quiz.interface"
import { ISteps } from "component/progression-step/progression-step.interface"
import { stepForm } from "../quiz.dummy"

const useQuizSoalCreate = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isStep, setIsStep] = useState<ISteps>(stepForm[0])

    const reactForm = useForm<IFormQuizSoal>({
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

export default useQuizSoalCreate
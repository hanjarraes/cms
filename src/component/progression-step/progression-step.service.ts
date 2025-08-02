import { useEffect, useState } from 'react'
import { ISteps } from './progression-step.interface'

const useProgressionStep = (items: ISteps[], selectedItem: ISteps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [labels, setLabels] = useState<string[]>(
        items.map((data) => data.label),
    )

    useEffect(() => {
        setActiveIndex(
            items.findIndex((item) => item.value === selectedItem.value),
        )
    }, [selectedItem])

    return {
        labels,
        activeIndex,
        setLabels,
        setActiveIndex,
    }
}
export default useProgressionStep

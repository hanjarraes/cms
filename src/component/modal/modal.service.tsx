import { useState } from 'react'

export interface IUseModal {
    isModalOpen: boolean
    openModalHandling: () => void
    closeModalHandling: () => void
    toggleModalHandling: () => void
}
export const useModal = (): IUseModal => {
    const [isModalOpen, setModalOpen] = useState(false)

    const openModalHandling = () => setModalOpen(true)
    const closeModalHandling = () => setModalOpen(false)
    const toggleModalHandling = () => setModalOpen(!isModalOpen)

    return {
        isModalOpen,
        openModalHandling,
        closeModalHandling,
        toggleModalHandling,
    }
}

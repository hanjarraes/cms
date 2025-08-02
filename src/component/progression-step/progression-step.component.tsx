import React from 'react'
import { IProgressionStepProps } from './progression-step.interface'
import useProgressionStep from './progression-step.service'

const ProgressionStep: React.FC<IProgressionStepProps> = ({
    steps,
    onChange,
    selectedItem,
    completedStep = false,
    disableBackClick = false,
}) => {
    const { labels, activeIndex, setActiveIndex } = useProgressionStep(
        steps,
        selectedItem
    )

    return (
        <>
            {steps?.map((step, idx) => {
                // if current step is not first then the step before is active
                // based on the latest design
                let isActive = activeIndex === idx
                if (idx < activeIndex) {
                    isActive = true
                }

                const classActive = !isActive
                    ? 'text-[--gray-v3]'
                    : 'text-[--info-v5] border-[--info-v5]'

                const classCursor = disableBackClick ? '' : 'cursor-pointer'
                return (
                    <div
                        key={idx}
                        className={`flex justify-center gap-2 ${classActive} ${classCursor}`}
                        onClick={() => {
                            if (isActive && disableBackClick) {
                                return
                            }
                            if (completedStep || isActive) {
                                setActiveIndex(idx)
                                onChange(step)
                            }
                        }}
                    >
                        {/* ---- Border Line ---- */}
                        {idx === 0 ? (
                            ''
                        ) : isActive ? (
                            <div className="w-28 mt-5 -mx-16">
                                <div className=" border-b-2 border-[--info-v5]" />
                            </div>
                        ) : (
                            <div className="w-28 mt-5 -mx-16 sm:w-[30px]">
                                <div className=" border-b-2 border-gray-v3" />
                            </div>
                        )}

                        {/* ---- Icon & Logo ---- */}
                        <div className="flex flex-col gap-2 justify-center items-center w-48">
                            <>
                                <i
                                    className={`
                      ${step.icon}
                      ${isActive ? 'border-[--info-v5]' : ''} 
                      text-size-M sm:text-[12px] not-italic p-1 flex justify-center aspect-square border-2  
                      rounded-full w-10 items-center
                  `}
                                >
                                    {step.textIcon}
                                </i>
                                <span className="text-size-S font-normal sm:text-[12px]">
                                    {labels[idx]}
                                </span>
                            </>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProgressionStep

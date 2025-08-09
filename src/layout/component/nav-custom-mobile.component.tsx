import { IRoute } from "common/common.interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavCustomMobile = ({
    title,
    icon,
    options,
    className,
}: {
    title: string
    icon?: string
    options: IRoute[]
    className?: string,
}) => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={className} >
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition w-full"
            >
                <span className="flex items-center gap-2">
                    <i className={`${icon} text-lg`} /> {title}
                </span>
                <i
                    className={`ri-arrow-down-s-line transform transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                ></i>
            </button>
            <div
                className={`pl-10 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {options.map((item, index) => {
                    if (item.show !== true) return
                    return (
                        <button
                            key={index}
                            className="text-left hover:underline hover:text-gray-900 transition"
                            onClick={() => nav(item.path)}
                        >
                            {item.text}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

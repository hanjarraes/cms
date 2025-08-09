import { IRoute } from "common/common.interface";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NavCustom = ({
    title,
    options,
    className,
    pathsActive,
    addCustom,
}: {
    title: string
    pathsActive: string[]
    options: IRoute[]
    className?: string,
    addCustom?: React.ReactNode
}) => {
    const nav = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isPathActive = (paths: string[]) => {
        return paths.some(p => location.pathname.startsWith(p));
    };

    const navLinkClass = (paths: string[]) => `
  relative cursor-pointer group
  ${isPathActive(paths) ? "text-[--info-v5]" : "text-gray-800"}
  transition-colors duration-200
   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
  after:bg-[--info-v5] after:transition-all after:duration-300

  ${isPathActive(paths) ? "after:w-full" : "after:w-0 group-hover:after:w-full"}
`;

    return (
        <div
            className={className + navLinkClass(pathsActive)}
            onClick={() => setIsOpen(!isOpen)}
        >
            {title}
            <div
                className={`absolute left-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 p-2 transform transition-all duration-200 origin-top ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                {options.map((item, index) => {
                    if(item.show !== true) return
                    return (
                        <div
                            key={index}
                            className={`hover:bg-[--info-v1] p-2 rounded cursor-pointer flex items-center gap-3
                                     ${item.path === location.pathname && 'bg-[--info-v2]'}`
                            }
                            onClick={() => nav(item.path)}
                        >
                            <i className={`text-lg ${item.icon} bg-[--info-v3] text-white px-3 py-2 rounded-md`} />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">{item.text}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    )
                })}
                {addCustom}
            </div>
        </div>
    )
}

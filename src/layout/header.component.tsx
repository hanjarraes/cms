import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dropdownBankSoal, dropdownSetting, } from "./layout.static";
import { NavCustom } from "./component/nav-custom.component";
import { mainRoutes } from "common/routes/routes";
import { NavCustomMobile } from "./component/nav-custom-mobile.component";


export default function Header(): React.ReactElement {
    const nav = useNavigate();
    const [openActivity, setOpenActivity] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b px-4 py-2 flex items-center justify-between shadow-sm relative">
            {/* Brand */}
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => nav("/")}
            >
                <img
                    src="https://images.vexels.com/content/266057/preview/bitcoin-sign-coin-money-icon-d532a7.png"
                    alt="Logo"
                    className="h-8 w-8"
                />
                <span className="text-xl font-semibold">Logo</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                {mainRoutes.map((routes, idRoutes) => {
                    if (routes.expandable && routes.sub) {
                        const activityPaths = routes.sub.map(r => r.path);
                        return (
                            <NavCustom
                                key={idRoutes}
                                title={routes.text}
                                options={routes.sub}
                                pathsActive={activityPaths}
                                addCustom={
                                    <div className="grid grid-cols-2 divide-x mt-2 border-t pt-2 border-gray-200">
                                        <div
                                            onClick={() => nav("/bank-soal-create")}
                                            className="text-center text-sm text-gray-700 hover:text-[--info-v5] px-2 cursor-pointer"
                                        >
                                            <i className="ri-play-circle-line mr-1" />
                                            Create Soal
                                        </div>
                                        <div
                                            onClick={() => nav("/template-create")}
                                            className="text-center text-sm text-gray-700 hover:text-[--info-v5] px-2 cursor-pointer"
                                        >
                                            <i className="ri-customer-service-2-line mr-1" />
                                            Create Quiz
                                        </div>
                                    </div>
                                }
                            />

                        )
                    }
                    return (
                        <div key={idRoutes} onClick={() => nav(routes.path)}>
                            {routes.text}
                        </div>
                    )
                })}
            </div>
            {/* Avatar & Burger */}
            <div className="flex items-center gap-4">
                <img
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="User"
                    className="h-9 w-9 rounded-full border"
                />
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <i className="ri-menu-line text-xl"></i>
                </button>
            </div>

            {/* Mobile Menu with Animation */}
            <div
                className={`absolute top-[60px] left-0 w-full bg-white/90 backdrop-blur-md border-t shadow-lg md:hidden z-50 transform transition-all duration-300 origin-top ${menuOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
            >
                <div className="p-4 flex flex-col gap-3 text-gray-700">
                    {mainRoutes.map((routes, idRoutes) => {
                        if (routes.expandable && routes.sub) {
                            return (
                                <NavCustomMobile
                                    title={routes.text}
                                    icon={routes.icon}
                                    options={routes.sub}
                                />
                            )
                        }
                        return (
                            <button
                                key={idRoutes}
                                onClick={() => nav(routes.path)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <i className={`${routes.icon} text-lg`} /> {routes.text}
                            </button>
                        )
                    })}
                </div>
            </div>
        </nav>
    );
}

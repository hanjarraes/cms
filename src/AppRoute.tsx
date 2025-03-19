import App from 'App'
import { IRoute } from 'common/common.interface'
import { mainRoutes } from 'common/routes/routes'
import { useConfig } from 'config/config.service'
import Page404 from 'pages/404-page/404-page.component'

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoute = () => {
    useConfig()
    const [routes] = useState<IRoute[]>(mainRoutes)

    return (
        <Routes>
            <Route element={<App />}>
                {routes.map(
                    (
                        { Content, path, expandable, sub }: IRoute,
                        idx: number,
                    ) => {
                        if (!expandable) {
                            return (
                                <Route
                                    key={idx}
                                    path={path}
                                    Component={Content}
                                />
                            )
                        } else {
                            return sub?.map((item, idxx) => {
                                return (
                                    <Route
                                        key={idxx}
                                        path={item.path}
                                        Component={item.Content}
                                    />
                                )
                            })
                        }
                    },
                )}
            </Route>

            {/* 404 */}
            <Route path="/*" element={<Page404 />} />
        </Routes>
    )
}

export default AppRoute

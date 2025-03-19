import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify'
import AppRoute from 'AppRoute'
import { Suspense } from 'react'
import './config/config-i18n.service'

// styling
import './layout/layout.style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Suspense>
                    <AppRoute />
                    <ToastContainer />
                </Suspense>
            </HashRouter>
        </PersistGate>
    </Provider>,
)

reportWebVitals()

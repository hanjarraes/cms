import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers, Store } from 'redux'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import commonReducer from 'common/common.slice'
import configReducer from '../config/config.slice'

const appReducer = combineReducers({
    // common
    common: commonReducer,
    config: configReducer,
})

export const rootReducer = (
    state: ReturnType<typeof appReducer> | undefined,
    action: AnyAction,
): ReturnType<typeof appReducer> => {
    if (action.type === 'RESET_STORE') {
        if (state) {
            state = {
                ...state,

            }
        }
    }
    return appReducer(state, action)
}
const key = 'loglines_store'

const persistConfig = {
    key,
    storage,
    whitelist: ['config', 'login', 'common'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const devTools = process.env.NODE_ENV !== 'production'
export const store = configureStore({
    reducer: persistedReducer,
    devTools,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: true,
            },
        }).concat(thunk),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
    dispatch: AppThunkDispatch
}

export type AppDispatch = ThunkDispatch<string, any, AnyAction>

// Create the typed versions of the useDispatch and useSelector Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// reset store
export const resetStore = () => store.dispatch({ type: 'RESET_STORE' })

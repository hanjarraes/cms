import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { IBuildVersion, IConfig } from './config.interface'
import { ThemeType } from 'common/common.interface'

export interface IConfigReducer {
    config: IConfig
    buildVersion: IBuildVersion
    currentThemes: ThemeType
}

const initialState: IConfigReducer = {
    config: {
        apiUrl: '',
        kcUrl: '',
        kcRealm: '',
        kcClient: '',
    },
    buildVersion: {
        lastBuild: '',
        frameworkVersion: '',
        client: '',
        clientVersion: 'X.X.X',
    },
    currentThemes: undefined,
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<IConfig>) => {
            state.config = action.payload
        },
        setClientVersion: (state, action: PayloadAction<IBuildVersion>) => {
            state.buildVersion = action.payload
        },
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.currentThemes = action.payload
        },
    },
})

export const { setConfig, setClientVersion, setTheme } = configSlice.actions

export const configSelector = (state: RootState) =>
    state.config.config ?? undefined
export const clientVersionSelector = (state: RootState) =>
    state.config.buildVersion
export const currentThemeSelector = (state: RootState) =>
    state.config.currentThemes
export default configSlice.reducer

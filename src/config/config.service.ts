import { IConfig } from './config.interface'

import { store } from 'store'

export const useConfig = () => {


}

export function getConfig(): IConfig {
    const state = store.getState()
    return state.config.config
}

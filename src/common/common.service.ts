import axios, { AxiosResponse } from 'axios'
import { IBlob, IFetch, IFetchOptions, IPost, IRoute } from './common.interface'
import { useEffect } from 'react'
import { getConfig } from 'config/config.service'
import { mainRoutes } from './routes/routes'

const getBaseUrl = () => {
    const config = getConfig()
    return config.apiUrl
}

export const fetch = async <D, T>(props: IFetch<T>) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            getBaseUrl() + props.endpoint,
            {
                params: props.params,
            },
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized Access: Please log in')
        } else {
            throw new Error('No Data Available')
        }
    }
}

export const fetchOptions = async <D>(props: IFetchOptions) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            getBaseUrl() + props.endpoint,
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized Access: Please log in')
        } else {
            throw new Error('No Data Available')
        }
    }
}

export const post = async <D, T>(props: IPost<T>) => {
    const response: AxiosResponse<D> = await axios.post(
        getBaseUrl() + props.endpoint,
        props?.payload,
        {
            headers: {
                'Content-Type': props?.isFormData
                    ? 'multipart/form-data'
                    : 'application/json',
            },
            params: props?.params,
        },
    )
    return response.data
}

export const put = async <D, T>(props: IPost<T>) => {
    const response: AxiosResponse<D> = await axios.put(
        getBaseUrl() + props.endpoint,
        props?.payload,
    )
    return response.data
}

export const deleteRequest = async <D, T>(props: IFetch<T>) => {
    console.log('props', props)

    const response: AxiosResponse<D> = await axios.delete(
        getBaseUrl() + props.endpoint,
        { params: props.params },
    )
    return response.data
}

export const fecthBlob = async <D, T>(props: IBlob<T>) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            getBaseUrl() + props.endpoint,
            {
                params: props?.params,
                responseType: 'blob',
            },
        )
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized Access: Please log in')
        } else {
            throw new Error('No Data Available')
        }
    }
}

export const getModuleParentId = () => {
    let parentIds: string[] = []

    mainRoutes.forEach((dt) => {
        if (!dt.parentId) {
            return
        }

        parentIds.push(dt.parentId)

        let sub: IRoute[] | undefined = dt.sub
        if (sub) {
            sub?.forEach((dtSub) => {
                if (!dtSub.parentId) {
                    return
                }
                parentIds.push(dtSub.parentId)
            })
        }
    })
    return parentIds
}

/**
 * Hook that alerts clicks outside of the passed refCombine words with spaces and change the first letter of each word to uppercase
 */
export function useOutsideClickHandling(ref: any, func: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                func()
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

export const getRoutesByClient = () => {
    // custom function to get route by client
    // not implemented on standalone project
}

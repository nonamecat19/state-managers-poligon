import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import useForceUpdate from "./useForceUpdate.ts";

export interface GetDataReturn<T> {
    isLoading: boolean
    error: string
    data: T | null
    update: () => void
    setData: Dispatch<SetStateAction<T | null>>
}

const useGetData = <T>(path: string): GetDataReturn<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<T | null>(null)
    const {dependency, update} = useForceUpdate()

    const options: AxiosRequestConfig = {
        url: path,
        method: 'GET',
    }

    useEffect(() => {
        axios<T>(options)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [dependency]);


    return {isLoading, error, data, update, setData}
}

export default useGetData
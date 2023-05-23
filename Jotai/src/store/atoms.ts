import {atom} from "jotai"
import {ItemType} from "../types/Item"

export const isLoadingState = atom<boolean>(true)
export const errorState = atom<string>('')
export const moneyState = atom<number>(2000)
export const cartState = atom<ItemType[]>([])
export const dataState = atom<ItemType[]>([])

export const totalPriceState = atom<number>(
    (get) => get(cartState).reduce((accumulator, current) => {
        return accumulator + current.price * current.number
    }, 0)
)
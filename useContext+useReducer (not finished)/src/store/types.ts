import {ItemType} from "../types/Item.ts";


export interface State {
    isLoading: boolean
    error: string
    money: number
    cart: ItemType[]
    data: ItemType[]
    totalPrice: number
}

export interface Actions {
    type: string
    payload: number
}

export type ThunkActions = (payload?: number) => {
    type: string
    payload?: number
}
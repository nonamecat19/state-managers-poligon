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
    cleanCart: () => void
    fetchData: () => Promise<void>
    buyProducts: () => void
    addToCart: (index: number) => void
    removeFromCart: (index: number) => void
    increaseProductCart: (index: number) => void
    decreaseProductCart: (index: number) => void
}
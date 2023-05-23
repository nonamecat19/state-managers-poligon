import {atom} from "recoil"
import {ItemType} from "../types/Item"

export const isLoadingState = atom<boolean>({
    key: 'isLoading',
    default: true
})

export const errorState = atom<string>({
    key: 'error',
    default: ''
})

export const moneyState = atom<number>({
    key: 'money',
    default: 2000
})

export const cartState = atom<ItemType[]>({
    key: 'cart',
    default: []
})

export const dataState = atom<ItemType[]>({
    key: 'data',
    default: []
})

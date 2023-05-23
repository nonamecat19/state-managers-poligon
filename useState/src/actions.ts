import {ItemType} from "./types/Item.ts";
import {Dispatch, SetStateAction} from "react";

export const addToCart = (index: number, cart: ItemType[], setCart: Dispatch<SetStateAction<ItemType[]>>, data: ItemType[]): void => {
    const dataClone = structuredClone(data)
    const newItem = dataClone[index]
    newItem.number = 1
    const newCart = [...cart, newItem]
    setCart(newCart)
}

export const removeFromCart = (index: number, cart: ItemType[], setCart: Dispatch<SetStateAction<ItemType[]>>, data: ItemType[]): void => {
    const newCart = cart.filter((el) => el.name !== data[index].name)
    setCart(newCart)
}

export const clearCart = (setCart: Dispatch<SetStateAction<ItemType[]>>): void => {
    setCart([])
}

export const increaseProductCart = (index: number, cart: ItemType[], setCart: Dispatch<SetStateAction<ItemType[]>>, data: ItemType[]): void => {
    const newCart = structuredClone(cart)
    const product = newCart.find((el) => el.name === data[index].name)
    if (product) {
        product.number++
    }
    setCart(newCart)
}

export const decreaseProductCart = (index: number, cart: ItemType[], setCart: Dispatch<SetStateAction<ItemType[]>>, data: ItemType[]): void => {
    const newCart = structuredClone(cart)
    const product = newCart.find((el) => el.name === data[index].name)
    if (product) {
        product.number--
    }
    setCart(newCart)
}

export const buyProducts = (cart: ItemType[], setCart: Dispatch<SetStateAction<ItemType[]>>, data: ItemType[], setData: Dispatch<SetStateAction<ItemType[] | null>>, money: number, setMoney: Dispatch<SetStateAction<number>>, totalPrice: number): void => {
    const newData = structuredClone(data)
    cart.forEach((el) => {
        const element = newData.find((el2) => el.name === el2.name)
        if (element) {
            element.number -= el.number
        }
    })
    setMoney(money - totalPrice)
    setData(newData)
    setCart([])
}
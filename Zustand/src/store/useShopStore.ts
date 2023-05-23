import {create} from 'zustand'
import {ItemType} from "../types/Item.ts"
import axios, {AxiosError, AxiosResponse} from "axios"
import {devtools} from 'zustand/middleware'

interface State {
    isLoading: boolean
    error: string
    money: number
    cart: ItemType[]
    data: ItemType[]
    totalPrice: () => number
}

interface Actions {
    cleanCart: () => void
    fetchData: () => void
    buyProducts: () => void
    addToCart: (index: number) => void
    removeFromCart: (index: number) => void
    increaseProductCart: (index: number) => void
    decreaseProductCart: (index: number) => void
}

const useShopStore = create<State & Actions>()(
    devtools(
        (set, get) => ({
            isLoading: true,
            error: '',
            money: 2000,
            cart: [],
            data: [],

            fetchData: async () => {
                await axios.get<ItemType[]>('/items')
                    .then((res: AxiosResponse<ItemType[]>) => {
                        set({data: res.data}, false, 'fetchData/data')
                    })
                    .catch((err: AxiosError) => {
                        set({error: err.message}, false, 'fetchData/error')
                    })
                await set({isLoading: false}, false, 'fetchData/isLoading')
            },

            cleanCart: () => set({cart: []}, false, 'cleanCart'),

            buyProducts: () => set(state => {
                const {cart, money, data, totalPrice} = state
                cart.forEach((el: ItemType) => {
                    const element = data.find((el2: ItemType) => el.name === el2.name)
                    if (element) {
                        element.number -= el.number
                    }
                })
                return {
                    money: money - totalPrice(),
                    data: [...data],
                    cart: []
                }
            }, false, 'buyProducts'),

            addToCart: (index: number) => set(state => {
                const {data, cart} = state
                const dataClone = structuredClone(data)
                const newItem = dataClone[index]
                newItem.number = 1
                const newCart = [...cart, newItem]
                return {cart: newCart}
            }, false, 'addToCart'),

            removeFromCart: (index: number) => set(state => {
                const {cart, data} = state
                const newCart = cart.filter((el) => el.name !== data[index].name)
                return {cart: newCart}
            }, false, 'removeFromCart'),

            increaseProductCart: (index: number) => set(state =>  {
                const {cart, data} = state
                const newCart = structuredClone(cart)
                const product = newCart.find((el) => el.name === data[index].name)
                if (product) {
                    product.number++
                }
                return {cart: newCart}
            }, false, 'increaseProductCart'),

            decreaseProductCart: (index: number) => set((state => {
                const {cart, data} = state
                const newCart = structuredClone(cart)
                const product = newCart.find((el) => el.name === data[index].name)
                if (product) {
                    product.number--
                }
                return {cart: newCart}
            }), false, 'decreaseProductCart'),

            totalPrice: () => get().cart.reduce((accumulator, current) => {
                return accumulator + current.price * current.number
            }, 0)
        })
    )
)


export default useShopStore
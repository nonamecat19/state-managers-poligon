import {atom} from "jotai"
import {ItemType} from "../types/Item"
import axios from "axios"

export const isLoadingAtom = atom<boolean>(true)
export const errorAtom = atom<string>('')
export const moneyAtom = atom<number>(2000)
export const cartAtom = atom<ItemType[]>([])
export const dataAtom = atom<ItemType[]>([])

export const totalPriceState = atom<number>(
    (get) => get(cartAtom).reduce((accumulator, current) => {
        return accumulator + current.price * current.number
    }, 0)
)


export const cleanCartAtom = atom<null, [], void>(
    () => null,
    (_get, set) => {
        set(cartAtom, []);
    }
)

export const buyProductsAtom = atom<null, [], void>(
    () => null,
    (get, set) => {
        const newData = structuredClone(get(dataAtom))

        get(cartAtom).forEach((el: ItemType) => {
            const element = newData.find((el2: ItemType) => el.name === el2.name)
            if (element) {
                element.number -= el.number
            }
        })
        set(dataAtom, newData)
        set(moneyAtom, get(moneyAtom) - get(totalPriceState))
        set(cartAtom,[])
    }
)

export const decreaseProductCartAtom = atom<null, [number], void>(
    () => null,
    (get, set, index: number) => {
        const newCart = structuredClone(get(cartAtom))
        const product = newCart.find((el) => el.name === get(dataAtom)[index].name)
        if (product) {
            product.number--
        }
        set(cartAtom, newCart)
    }
)

export const increaseProductCartAtom = atom<null, [number], void>(
    () => null,
    (get, set, index: number) => {
        const newCart = structuredClone(get(cartAtom))
        const product = newCart.find((el) => el.name === get(dataAtom)[index].name)
        if (product) {
            product.number++
        }
        set(cartAtom, newCart)
    }
)

export const removeFromCartAtom = atom<null, [number], void>(
    () => null,
    (get, set, index: number) => {
        const newCart = get(cartAtom).filter((el) => el.name !== get(dataAtom)[index].name)
        set(cartAtom, newCart)
    }
)

export const addToCartAtom = atom<null, [number], void>(
    () => null,
    (get, set, index: number) => {
        const newItem = structuredClone(get(dataAtom)[index])
        newItem.number = 1
        set(cartAtom, [...get(cartAtom), newItem])
    }
)

export const fetchDataAtom = atom(
    () => null,
    (_get, set) => {
        set(isLoadingAtom, true)
        axios.get<ItemType[]>('/items')
            .then((res) => {
                set(dataAtom, res.data)
            })
            .catch((err) => {
                set(errorAtom, err.message)
            })
            .finally(() => {
                set(isLoadingAtom, false)
            })
    }
)
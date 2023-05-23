import {selector} from "recoil";
import {cartState} from "./atoms";

export const totalPriceSelector = selector<number>({
    key: 'totalPrice',
    get: ({get}) => {
        const cart = get(cartState)
        return cart.reduce((accumulator, current) => {
            return accumulator + current.price * current.number
        }, 0)
    }
})
import {
    ADD_TO_CART,
    BUY_PRODUCTS,
    CLEAN_CART,
    DECREASE_PRODUCT_CART,
    FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS,
    INCREASE_PRODUCT_CART,
    REMOVE_FROM_CART
} from "./actionTypes.ts"
import {ItemType} from "../types/Item.ts"

export const cleanCart = () => ({
    type: CLEAN_CART,
    info: 'Clean cart'
})
export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST
})

export const fetchDataSuccess = (data: ItemType[]) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data
})

export const fetchDataFailure = (error: Error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error
})

export const buyProducts = () => ({
    type: BUY_PRODUCTS,
    info: 'Buy all products in cart'
})

export const addToCart = (index: number) => ({
    type: ADD_TO_CART,
    info: 'Add item to cart',
    payload: index
})

export const removeFromCart = (index: number) => ({
    type: REMOVE_FROM_CART,
    info: 'Remove item from cart',
    payload: index
})

export const increaseProductCart = (index: number) => ({
    type: INCREASE_PRODUCT_CART,
    info: '+1 to product in cart',
    payload: index
})

export const decreaseProductCart = (index: number) => ({
    type: DECREASE_PRODUCT_CART,
    info: '-1 to product in cart',
    payload: index
})

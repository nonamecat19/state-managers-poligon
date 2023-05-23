import {
    ADD_TO_CART,
    BUY_PRODUCTS,
    CLEAN_CART,
    DECREASE_PRODUCT_CART,
    FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS,
    INCREASE_PRODUCT_CART,
    REMOVE_FROM_CART
} from "./actionTypes"
import {ItemType} from "../types/Item"
import {Actions, State} from "./types"
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {fetchDataFailure, fetchDataRequest, fetchDataSuccess} from "./actions"
import axios, {AxiosError, AxiosResponse} from "axios"

const initialState: State = {
    isLoading: true,
    error: '',
    money: 2000,
    cart: [],
    data: [],
    totalPrice: 0
}

export const fetchItems: ThunkAction<void, any, any, AnyAction> = (): any => {
    return (dispatch: ThunkDispatch<object, object, AnyAction>) => {
        dispatch(fetchDataRequest())
        axios.get<ItemType[]>('/items')
            .then((res: AxiosResponse<ItemType[]>) => {
                dispatch(fetchDataSuccess(res.data))
            })
            .catch((err: AxiosError) => {
                dispatch(fetchDataFailure(err))
            })
    }
}

const shopReducer = (state: State, action: Actions) => {
    switch (action.type) {
        case CLEAN_CART:
            return {
                ...state,
                cart: [],
                totalPrice: 0
            }

        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                data: action.payload
            }

        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case BUY_PRODUCTS :
            state.cart.forEach((el: ItemType) => {
                const element = state.data.find((el2: ItemType) => el.name === el2.name)
                if (element) {
                    element.number -= el.number
                }
            })
            return {
                ...state,
                money: state.money - state.totalPrice,
                data: [...state.data],
                cart: [],
                totalPrice: 0
            }

        case ADD_TO_CART : {
            const {data, cart} = state
            const dataClone = structuredClone(data)
            const newItem = dataClone[action.payload]
            newItem.number = 1
            const newCart = [...cart, newItem]
            const newTotalPrice = newCart.reduce((accumulator, current) => {
                return accumulator + current.price * current.number
            }, 0)
            return {
                ...state,
                cart: newCart,
                totalPrice: newTotalPrice
            }
        }

        case REMOVE_FROM_CART : {
            const {cart, data} = state
            const newCart = cart.filter((el) => el.name !== data[action.payload].name)
            const newTotalPrice = newCart.reduce((accumulator, current) => {
                return accumulator + current.price * current.number
            }, 0)
            return {
                ...state,
                cart: newCart,
                totalPrice: newTotalPrice
            }
        }

        case INCREASE_PRODUCT_CART : {
            const {cart, data} = state
            const newCart = structuredClone(cart)
            const product = newCart.find((el) => el.name === data[action.payload].name)
            if (product) {
                product.number++
            }
            const newTotalPrice = newCart.reduce((accumulator, current) => {
                return accumulator + current.price * current.number
            }, 0)
            return {
                ...state,
                cart: newCart,
                totalPrice: newTotalPrice
            }
        }

        case DECREASE_PRODUCT_CART : {
            const {cart, data} = state
            const newCart = structuredClone(cart)
            const product = newCart.find((el) => el.name === data[action.payload].name)
            if (product) {
                product.number--
            }
            const newTotalPrice = newCart.reduce((accumulator, current) => {
                return accumulator + current.price * current.number
            }, 0)
            return {
                ...state,
                cart: newCart,
                totalPrice: newTotalPrice
            }
        }

        default:
            return state
    }
}

const rootReducer = (state: State = initialState, action: Actions) =>  {
    return {
        ...shopReducer(state, action),
    }
}
export default rootReducer
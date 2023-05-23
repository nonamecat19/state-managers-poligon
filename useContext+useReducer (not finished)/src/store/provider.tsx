import {FC, PropsWithChildren, useReducer} from "react";
import ShopContext from "./context";
import {initialState, rootReducer} from "./reducer";
import {
    ADD_TO_CART,
    BUY_PRODUCTS,
    CLEAN_CART, DECREASE_PRODUCT_CART,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS, INCREASE_PRODUCT_CART, REMOVE_FROM_CART
} from "./actionTypes.ts";
import {ItemType} from "../types/Item.ts";

const ContextProvider: FC<PropsWithChildren> = ({children}) => {

    // @ts-ignore
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const cleanCart = () => {

        dispatch()

        dispatch({
            type: CLEAN_CART
        })


    }
    const fetchDataRequest = () => ({
        type: FETCH_DATA_REQUEST
    })

    const fetchDataSuccess = (data: ItemType[]) => ({
        type: FETCH_DATA_SUCCESS,
        payload: data
    })

    const fetchDataFailure = (error: Error) => ({
        type: FETCH_DATA_FAILURE,
        payload: error
    })

    const buyProducts = () => ({
        type: BUY_PRODUCTS,
        info: 'Buy all products in cart'
    })

    const addToCart = (index: number) => ({
        type: ADD_TO_CART,
        info: 'Add item to cart',
        payload: index
    })

    const removeFromCart = (index: number) => ({
        type: REMOVE_FROM_CART,
        info: 'Remove item from cart',
        payload: index
    })

    const increaseProductCart = (index: number) => ({
        type: INCREASE_PRODUCT_CART,
        info: '+1 to product in cart',
        payload: index
    })

    const decreaseProductCart = (index: number) => ({
        type: DECREASE_PRODUCT_CART,
        info: '-1 to product in cart',
        payload: index
    })

    return (
        // @ts-ignore
        <ShopContext.Provider value={[state, dispatch]}>
            {children}
        </ShopContext.Provider>


    )

}
export default ContextProvider
import {Dispatch, FC, SetStateAction} from "react"
import {ItemType} from "../types/Item.ts"
import {Button, Container, Heading} from "@chakra-ui/react";
import CartItem from "./CartItem.tsx";
import {buyProducts, clearCart} from "../actions.ts";

type Props = {
    data: ItemType[]
    money: number,
    setMoney: Dispatch<SetStateAction<number>>,
    cart: ItemType[],
    setCart: Dispatch<SetStateAction<ItemType[]>>
    totalPrice: number
    setData: Dispatch<SetStateAction<ItemType[] | null>>
}
const Cart: FC<Props> = ({money, setCart, cart, setMoney, totalPrice, data, setData}) => {

     const isEnoughMoney = (): boolean => {
        return money >= totalPrice
     }

    return (
        <Container
            borderWidth='0 0 0 10px'
            borderColor='blue.600'
            w={400}
            h='100vh'
        >
            <Heading>Your money: {money}</Heading>
            <Heading>Total: {totalPrice}</Heading>

            {cart.map((el, index) => <CartItem key={index} index={data.findIndex((el2) => el2.name === el.name)} item={el} cart={cart} setCart={setCart} data={data}/>)}


            <Button marginLeft={5} onClick={() => clearCart(setCart)}>
                Clear cart
            </Button>

            <Button marginLeft={5} onClick={() => {
                if (isEnoughMoney()) {
                    buyProducts(cart, setCart, data, setData, money, setMoney, totalPrice)
                } else {
                    alert('Not enough money!')
                }
            }}>
                Buy
            </Button>
        </Container>
    )
}
export default Cart
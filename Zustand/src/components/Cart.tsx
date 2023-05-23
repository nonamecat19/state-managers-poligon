import {FC} from "react"
import {Button, Container, Heading} from "@chakra-ui/react";
import CartItem from "./CartItem.tsx";
import useShopStore from "../store/useShopStore.ts";
import {shallow} from "zustand/shallow";

const Cart: FC = () => {
    const {money, totalPrice, cart, data, clearCart, buyProducts} = useShopStore((state) => ({
        money: state.money,
        totalPrice: state.totalPrice(),
        cart: state.cart,
        data: state.data,
        clearCart: state.cleanCart,
        buyProducts: state.buyProducts
    }), shallow)

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

            {cart.map((item, index) => <CartItem key={index} index={data.findIndex((el2) => el2.name === item.name)} item={item}/>)}


            <Button marginLeft={5} onClick={clearCart}>
                Clear cart
            </Button>

            <Button marginLeft={5} onClick={() => {
                if (isEnoughMoney()) {
                    buyProducts()
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
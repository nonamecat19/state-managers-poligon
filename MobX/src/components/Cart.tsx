import {FC} from "react"
import {Button, Container, Heading} from "@chakra-ui/react"
import CartItem from "./CartItem"
import Store from "../store/store"
import {observer} from "mobx-react-lite";

const Cart: FC = observer(() => {
     const isEnoughMoney = (): boolean => {
        return Store.money >= Store.totalPrice
     }

    return (
        <Container
            borderWidth='0 0 0 10px'
            borderColor='blue.600'
            w={400}
            h='100vh'
        >
            <Heading>Your money: {Store.money}</Heading>
            <Heading>Total: {Store.totalPrice}</Heading>

            {Store.cart.map((item) =>
                <CartItem
                    key={item.name}
                    index={Store.data.findIndex((el2) => el2.name === item.name)}
                    item={item}
                />
            )}


            <Button marginLeft={5} onClick={() => Store.cleanCart()}>
                Clear cart
            </Button>

            <Button marginLeft={5} onClick={() => {
                if (isEnoughMoney()) {
                    Store.buyProducts()
                } else {
                    alert('Not enough money!')
                }
            }}>
                Buy
            </Button>
        </Container>
    )
})
export default Cart
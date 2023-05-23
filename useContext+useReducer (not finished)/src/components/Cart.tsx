import {FC} from "react"
import {Button, Container, Heading} from "@chakra-ui/react"
import CartItem from "./CartItem.tsx"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {buyProducts, cleanCart} from "../store/actions.ts"

const Cart: FC = () => {
    const dispatch = useDispatch()

    const money = useSelector(state => state.money, shallowEqual)
    const totalPrice = useSelector(state => state.totalPrice, shallowEqual)
    const cart = useSelector(state => state.cart, shallowEqual)
    const data = useSelector(state => state.data, shallowEqual)

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


            <Button marginLeft={5} onClick={() => dispatch(cleanCart())}>
                Clear cart
            </Button>

            <Button marginLeft={5} onClick={() => {
                if (isEnoughMoney()) {
                    dispatch(buyProducts())
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
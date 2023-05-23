import {FC} from "react"
import {Button, Container, Heading} from "@chakra-ui/react"
import CartItem from "./CartItem"
import {cartAtom, cleanCartAtom, dataAtom, moneyAtom, totalPriceState} from "../store/atoms"
import {ItemType} from "../types/Item"
import {useAtom} from "jotai"

const Cart: FC = () => {
    const [totalPrice] = useAtom(totalPriceState)
    const [money, setMoney] = useAtom(moneyAtom)
    const [cart, setCart] = useAtom(cartAtom)
    const [data, setData] = useAtom(dataAtom)
    const [, cleanCart] = useAtom(cleanCartAtom)

     const buyProducts = () => {
        const newData = structuredClone(data)
         cart.forEach((el: ItemType) => {
             const element = newData.find((el2: ItemType) => el.name === el2.name)
             if (element) {
                 element.number -= el.number
             }
         })
         setData(newData)
         setMoney(money - totalPrice)
         setCart([])
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

            {cart.map((item) =>
                <CartItem
                    key={item.name}
                    index={data.findIndex((el2) => el2.name === item.name)}
                    item={item}
                />
            )}


            <Button marginLeft={5} onClick={cleanCart}>
                Clear cart
            </Button>

            <Button marginLeft={5} onClick={() => {
                if (money >= totalPrice) {
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
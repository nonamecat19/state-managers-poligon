import {Dispatch, FC, SetStateAction} from "react"
import {ItemType} from "../types/Item.ts";
import {Button, Container, Stack} from "@chakra-ui/react"
import {AddIcon, CloseIcon, MinusIcon} from "@chakra-ui/icons"
import {decreaseProductCart, increaseProductCart, removeFromCart} from "../actions.ts";

type Props = {
    index: number
    data: ItemType[]
    item: ItemType
    cart: ItemType[]
    setCart: Dispatch<SetStateAction<ItemType[]>>
}
const CartItem: FC<Props> = ({data, cart, setCart, index, item}) => {

    const {name, price, number} = item

    return (
        <Container
            background='blue.400'
            color='white'
            borderRadius={5}
            h='55px'
            padding='0 8px 0px 15px'
            margin={4}
        >
            <Stack
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <div>
                    {name}
                    {' '}
                    {price}$
                </div>

                <div>
                    <Button colorScheme='gray' variant='ghost' onClick={() => {
                        if (number <= 1) {
                            alert('Incorrect value')
                        } else {
                            decreaseProductCart(index, cart, setCart, data)
                        }
                    }}>
                        <MinusIcon/>
                    </Button>
                    {number}
                    <Button colorScheme='gray' variant='ghost' disabled={number >= data[index].number} onClick={() => {
                        if (number >= data[index].number) {
                            alert('Incorrect value')
                        } else {
                            increaseProductCart(index, cart, setCart, data)
                        }
                    }}>
                        <AddIcon/>
                    </Button>
                    <Button colorScheme='gray' variant='ghost' onClick={() => removeFromCart(index, cart, setCart, data)}>
                        <CloseIcon/>
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}
export default CartItem
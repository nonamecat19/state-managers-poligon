import {FC} from "react"
import {ItemType} from "../types/Item"
import {Button, Container, Stack} from "@chakra-ui/react"
import {AddIcon, CloseIcon, MinusIcon} from "@chakra-ui/icons"
import {dataAtom, decreaseProductCartAtom, increaseProductCartAtom, removeFromCartAtom} from "../store/atoms"
import {useAtom, useSetAtom} from "jotai";

type Props = {
    index: number
    item: ItemType
}
const CartItem: FC<Props> = ({index, item}) => {
    const {name, price, number} = item

    const [data] = useAtom(dataAtom)
    const decreaseProductCart = useSetAtom(decreaseProductCartAtom)
    const increaseProductCart = useSetAtom(increaseProductCartAtom)
    const removeFromCart = useSetAtom(removeFromCartAtom)

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
                            decreaseProductCart(index)
                        }
                    }}>
                        <MinusIcon/>
                    </Button>
                    {number}
                    <Button colorScheme='gray' variant='ghost' onClick={() => {
                        if (number >= data[index].number) {
                            alert('Incorrect value')
                        } else {
                            increaseProductCart(index)
                        }
                    }}>
                        <AddIcon/>
                    </Button>
                    <Button colorScheme='gray' variant='ghost' onClick={() => removeFromCart(index)}>
                        <CloseIcon/>
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}
export default CartItem
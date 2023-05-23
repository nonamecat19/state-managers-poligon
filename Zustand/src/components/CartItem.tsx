import {FC} from "react"
import {ItemType} from "../types/Item.ts";
import {Button, Container, Stack} from "@chakra-ui/react"
import {AddIcon, CloseIcon, MinusIcon} from "@chakra-ui/icons"
import useShopStore from "../store/useShopStore.ts";
import {shallow} from "zustand/shallow";

type Props = {
    index: number
    item: ItemType
}
const CartItem: FC<Props> = ({index, item}) => {

    const {name, price, number} = item

    const {decreaseProductCart, increaseProductCart, removeFromCart, data} = useShopStore((state) => ({
        decreaseProductCart: state.decreaseProductCart,
        increaseProductCart: state.increaseProductCart,
        removeFromCart: state.removeFromCart,
        data: state.data
    }), shallow)

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
                    <Button colorScheme='gray' variant='ghost' disabled={number >= data[index].number} onClick={() => {
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
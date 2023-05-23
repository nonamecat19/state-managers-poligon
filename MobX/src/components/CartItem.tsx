import {FC} from "react"
import {ItemType} from "../types/Item.ts";
import {Button, Container, Stack} from "@chakra-ui/react"
import {AddIcon, CloseIcon, MinusIcon} from "@chakra-ui/icons"
import Store from "../store/store.ts";
import {observer} from "mobx-react-lite";

type Props = {
    index: number
    item: ItemType
}
const CartItem: FC<Props> = observer(({index, item}) => {
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
                            Store.decreaseProductCart(index)
                        }
                    }}>
                        <MinusIcon/>
                    </Button>
                    {number}
                    <Button colorScheme='gray' variant='ghost' onClick={() => {
                        if (number >= Store.data[index].number) {
                            alert('Incorrect value')
                        } else {
                            Store.increaseProductCart(index)
                        }
                    }}>
                        <AddIcon/>
                    </Button>
                    <Button colorScheme='gray' variant='ghost' onClick={() => Store.removeFromCart(index)}>
                        <CloseIcon/>
                    </Button>
                </div>
            </Stack>
        </Container>
    )
})
export default CartItem
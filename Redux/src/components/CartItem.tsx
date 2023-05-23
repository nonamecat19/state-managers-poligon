import {FC} from "react"
import {ItemType} from "../types/Item"
import {Button, Container, Stack} from "@chakra-ui/react"
import {AddIcon, CloseIcon, MinusIcon} from "@chakra-ui/icons"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {decreaseProductCart, increaseProductCart, removeFromCart} from "../store/actions"

type Props = {
    index: number
    item: ItemType
}
const CartItem: FC<Props> = ({index, item}) => {

    const {name, price, number} = item

    const dispatch = useDispatch()

    const data = useSelector(state => state.data, shallowEqual)

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
                            dispatch(decreaseProductCart(index))
                        }
                    }}>
                        <MinusIcon/>
                    </Button>
                    {number}
                    <Button colorScheme='gray' variant='ghost' disabled={number >= data[index].number} onClick={() => {
                        if (number >= data[index].number) {
                            alert('Incorrect value')
                        } else {
                            dispatch(increaseProductCart(index))
                        }
                    }}>
                        <AddIcon/>
                    </Button>
                    <Button colorScheme='gray' variant='ghost' onClick={() => dispatch(removeFromCart(index))}>
                        <CloseIcon/>
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}
export default CartItem
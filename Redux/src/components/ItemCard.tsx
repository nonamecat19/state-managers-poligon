import {FC} from "react"
import {Button, Card, Container, Image, Stack, Text} from "@chakra-ui/react"
import {ItemType} from "../types/Item"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {addToCart, removeFromCart} from "../store/actions"

interface Props {
    index: number
}

const ItemCard: FC<Props> = ({index}) => {

    const item = useSelector(store => store.data[index], shallowEqual)

    const {name, image, price, number} = item

    return (
        <Card w='2xs' borderRadius='lg' boxShadow={'0 0 5px 5px #00000012'} pos={'relative'}>
            <Container
                pos='absolute'
                bg={'white'}
                w={8}
                h={8}
                borderRadius={"full"}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                top={1}
                right={1}
                boxShadow={'0 0 5px 5px #00000012'}
            >
                {number}
            </Container>
            <Image
                src={image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                objectFit='cover'
                height={150}
            />
            <Container p={5}>
                <Stack marginBottom={4}>
                    <Text color='blue.600' fontSize='2xl'>
                        {name} ${price}
                    </Text>
                </Stack>
                <FooterButton number={number} index={index}/>
            </Container>
        </Card>
    )
}

type FooterButtonProps = {
    index: number,
} & Pick<ItemType, "number">

const FooterButton: FC<FooterButtonProps> = ({number, index}) => {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart, shallowEqual)
    const data = useSelector((state) => state.data, shallowEqual)
    const inCart = (index: number): boolean => !!cart.find((el) => el.name === data[index].name)

    if (inCart(index)) {
        return (
            <Button variant='outline' colorScheme='blue' w={215} onClick={() => dispatch(removeFromCart(index))}>
                Delete from cart
            </Button>
        )
    }
    if (number === 0) {
        return (
            <Button variant='outline' colorScheme='blue' w={215}>
                Not available
            </Button>
        )
    }
    return (
        <Button variant='solid' colorScheme='blue' w={215} onClick={() => dispatch(addToCart(index))}>
            Add to cart
        </Button>
    )

}

export default ItemCard
import {FC} from "react"
import {Button, Card, Container, Image, Stack, Text} from "@chakra-ui/react"
import {ItemType} from "../types/Item"
import {useRecoilState, useRecoilValue} from "recoil";
import {cartState, dataState} from "../store/atoms";

interface Props {
    index: number
    item: ItemType
}

const ItemCard: FC<Props> = ({index, item}) => {
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
                <FooterButton item={item} index={index}/>
            </Container>
        </Card>
    )
}

type FooterButtonProps = {
    index: number
    item: ItemType
}

const FooterButton: FC<FooterButtonProps> = ({item, index}) => {
    const [cart, setCart] = useRecoilState(cartState)
    const data = useRecoilValue(dataState)

    const addToCart = () => {
        const newItem = structuredClone(data[index])
        newItem.number = 1
        setCart([...cart, newItem])
    }

    const removeFromCart = () => {
        const newCart = cart.filter((el) => el.name !== data[index].name)
        setCart(newCart)
    }

    const inCart = cart.find((el) => el.name === item.name)

    if (inCart) {
        return (
            <Button variant='outline' colorScheme='blue' w={215} onClick={removeFromCart}>
                Delete from cart
            </Button>
        )
    }
    if (item.number === 0) {
        return (
            <Button variant='outline' colorScheme='blue' w={215}>
                Not available
            </Button>
        )
    }
    return (
        <Button variant='solid' colorScheme='blue' w={215} onClick={addToCart}>
            Add to cart
        </Button>
    )
}

export default ItemCard
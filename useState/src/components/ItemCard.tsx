import {Dispatch, FC, SetStateAction} from "react";
import {
    Button,
    Card,
    Container,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";
import {ItemType} from "../types/Item.ts";
import {addToCart, removeFromCart} from "../actions.ts";

interface Props {
    data: ItemType[]
    item: ItemType
    index: number
    cart: ItemType[],
    setCart: Dispatch<SetStateAction<ItemType[]>>
}

const ItemCard: FC<Props> = ({item, setCart, cart, index, data}) => {

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
                <FooterButton number={number} data={data} cart={cart} setCart={setCart} index={index}/>
            </Container>
        </Card>
    )
}

type FooterButtonProps = {
    index: number,
    data: ItemType[],
    cart: ItemType[],
    setCart: Dispatch<SetStateAction<ItemType[]>>
} & Pick<ItemType, "number">

const FooterButton: FC<FooterButtonProps> = ({number, index, setCart, cart, data}) => {

    const inCart = !!cart.find((el) => el.name === data[index].name)

    if (inCart) {
        return (
            <Button variant='outline' colorScheme='blue' w={215} onClick={() => removeFromCart(index, cart, setCart, data)}>
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
        <Button variant='solid' colorScheme='blue' w={215} onClick={() => addToCart(index, cart, setCart, data)}>
            Add to cart
        </Button>
    )

}

export default ItemCard
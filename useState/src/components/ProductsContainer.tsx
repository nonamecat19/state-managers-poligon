import {Dispatch, FC, SetStateAction} from "react"
import {ItemType} from "../types/Item.ts";
import ItemCard from "./ItemCard.tsx";
import {Container, Heading, Text} from "@chakra-ui/react";
import {GetDataReturn} from "../hooks/useGetData.ts";

type Props = {
    items: GetDataReturn<ItemType[]>
    money: number,
    setMoney: Dispatch<SetStateAction<number>>,
    cart: ItemType[],
    setCart: Dispatch<SetStateAction<ItemType[]>>
}
const ProductsContainer: FC<Props> = ({items, cart, setCart}) => {
    return (
        <Container
            as={'section'}
            alignItems={'flex-start'}
            w={'calc(100% - 400px)'}
            h={'100vh'}

            p={5}
            overflowY={'auto'}
        >
            <Heading
                w='full'
                textAlign='center'
                fontSize='2rem'
                color='blue.600'
                h='70px'
            >
                Products
            </Heading>
            <ProductsData items={items} cart={cart} setCart={setCart}/>
        </Container>
    )
}

interface ProductsDataProps {
    items: GetDataReturn<ItemType[]>
    cart: ItemType[]
    setCart: Dispatch<SetStateAction<ItemType[]>>
}

const ProductsData: FC<ProductsDataProps> = ({items, cart, setCart}) => {
    const {isLoading, data, error} = items
    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }
    if (error) {
        return (
            <Text>Error: {error}</Text>
        )
    }
    if (!data) {
        return null
    }
    return (
        <Container
            display='flex'
            flexDirection='row'
            flexWrap='wrap'
            gap={5}
        >
            {
                data.map((element, index) => {
                    return (
                        <ItemCard
                            data={data}
                            item={element}
                            key={index}
                            index={index}
                            cart={cart}
                            setCart={setCart}
                        />
                    )
                })
            }
        </Container>
    )
}

export default ProductsContainer
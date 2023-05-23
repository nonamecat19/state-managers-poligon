import {FC} from "react"
import ItemCard from "./ItemCard.tsx";
import {Container, Heading, Text} from "@chakra-ui/react";
import useShopStore from "../store/useShopStore.ts";
import {shallow} from "zustand/shallow";
import {useSelector} from "react-redux";

const ProductsContainer: FC = () => {
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
            <ProductsData/>
        </Container>
    )
}

const ProductsData: FC = () => {
    const isLoading = useSelector(state => state.isLoading)
    const data = useSelector(state => state.data)
    const error = useSelector(state => state.error)

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
                data.map((_, index) => {
                    return (
                        <ItemCard
                            key={index}
                            index={index}
                        />
                    )
                })
            }
        </Container>
    )
}

export default ProductsContainer
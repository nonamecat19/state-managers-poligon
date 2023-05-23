import {FC} from "react"
import ItemCard from "./ItemCard";
import {Container, Heading, Text} from "@chakra-ui/react";
import Store from "../store/store"
import {observer} from "mobx-react-lite";

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

const ProductsData: FC = observer(() => {
    if (Store.isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }
    if (Store.error) {
        return (
            <Text>Error: {Store.error}</Text>
        )
    }
    if (!Store.data) {
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
                Store.data.map((item, index) => {
                    return (
                        <ItemCard
                            key={item.name}
                            index={index}
                            item={item}
                        />
                    )
                })
            }
        </Container>
    )
})
export default ProductsContainer
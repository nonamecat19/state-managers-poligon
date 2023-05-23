import {FC} from "react"
import ItemCard from "./ItemCard"
import {Container, Heading, Text} from "@chakra-ui/react"
import {useRecoilValue} from "recoil"
import {dataState, errorState, isLoadingState} from "../store/atoms"

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
    const isLoading = useRecoilValue(isLoadingState)
    const error = useRecoilValue(errorState)
    const data = useRecoilValue(dataState)

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
                data.map((item, index) => {
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
}
export default ProductsContainer
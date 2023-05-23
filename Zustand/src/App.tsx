import {FC, useEffect} from 'react'
import ProductsContainer from "./components/ProductsContainer.tsx"
import {Container} from "@chakra-ui/react"
import Cart from "./components/Cart.tsx"
import useShopStore from "./store/useShopStore.ts";
import {shallow} from "zustand/shallow";

const App: FC = () => {

    const fetchData = useShopStore(state => state.fetchData, shallow)

    useEffect(() => {
        fetchData()
    }, [fetchData]);


    return (
        <Container
            as='section'
            display='flex'
            justifyContent='center'
            alignItems={'flex-start'}
        >
            <ProductsContainer/>
            <Cart/>
        </Container>
    )
}
export default App

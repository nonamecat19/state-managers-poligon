import {FC, useEffect} from 'react'
import ProductsContainer from "./components/ProductsContainer"
import {Container} from "@chakra-ui/react"
import Cart from "./components/Cart"
import {useDispatch} from "react-redux"
import {fetchItems} from "./store/reducer"
const App: FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchItems())
    }, [dispatch]);


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

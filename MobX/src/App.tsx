import {FC, useEffect} from 'react'
import {Container} from "@chakra-ui/react"
import {observer} from 'mobx-react-lite'
import Store from "./store/store"
import Cart from "./components/Cart"
import ProductsContainer from "./components/ProductsContainer"

const App: FC = observer(() => {

    useEffect(() => {
        Store.fetchData().then()
    }, [])


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
})
export default App

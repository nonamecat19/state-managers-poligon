import {FC, useEffect} from 'react'
import {Container} from "@chakra-ui/react"
import Cart from "./components/Cart"
import ProductsContainer from "./components/ProductsContainer"
import {fetchDataAtom} from "./store/atoms"
import {useSetAtom} from "jotai"

const App: FC = () => {
    const fetchData = useSetAtom(fetchDataAtom)

    useEffect(() => {
        fetchData()
    }, [fetchData])

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

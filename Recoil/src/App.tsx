import {FC, useEffect} from 'react'
import {Container} from "@chakra-ui/react"
import Cart from "./components/Cart"
import ProductsContainer from "./components/ProductsContainer"
import {useSetRecoilState} from "recoil"
import {dataState, errorState, isLoadingState} from "./store/atoms"
import axios from "axios"
import {ItemType} from "./types/Item"

const App: FC = () => {
    const setData = useSetRecoilState(dataState)
    const setIsLoading = useSetRecoilState(isLoadingState)
    const setError = useSetRecoilState(errorState)

    useEffect(() => {
        setIsLoading(true)
        axios.get<ItemType[]>('/items')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [setData, setError, setIsLoading])

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

import {FC, useEffect, useState} from 'react'
import useGetData from "./hooks/useGetData.ts";
import {ItemType} from "./types/Item.ts";
import ProductsContainer from "./components/ProductsContainer.tsx";
import {Container} from "@chakra-ui/react";
import Cart from "./components/Cart.tsx";

const App: FC = () => {

    const items = useGetData<ItemType[]>('/items')

    const [money, setMoney] = useState<number>(200)
    const [cart, setCart] = useState<ItemType[]>([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const total = cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.number * currentValue.price
        }, 0)
        setTotalPrice(total)
    }, [cart])

    return (
        <Container
            as='section'
            display='flex'
            justifyContent='center'
            alignItems={'flex-start'}
        >
            <ProductsContainer items={items} money={money} setMoney={setMoney} cart={cart} setCart={setCart}/>
            <Cart cart={cart} setCart={setCart} money={money} setMoney={setMoney} totalPrice={totalPrice} data={items.data ?? []} setData={items.setData}/>
        </Container>
    )
}
export default App

import {setupWorker, rest} from 'msw'
import {ItemType} from "../types/Item.ts";

type ItemsResponse = ItemType[]

const mockWorker = setupWorker(
    rest.get<ItemsResponse>('/items', async (_, res, ctx) => {
        return res(
            ctx.delay(500),
            ctx.json([
                {
                    name: 'Ice cream',
                    number: 5,
                    price: 2,
                    image: 'https://img.taste.com.au/aTRfUKcR/w643-h428-cfill-q90/taste/2016/11/vanilla-bean-ice-cream-12608-1.jpeg'
                },
                {
                    name: 'Cake',
                    number: 8,
                    price: 20,
                    image: 'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/my_perfect_vanilla_cake_2_0.jpg'
                },
                {
                    name: 'Pie',
                    number: 3,
                    price: 12,
                    image: 'https://www.thespruceeats.com/thmb/Jbu2MrMPocRTI3jbR-H6Gm5Up8E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/basic-cherry-pie-recipe-995136-14-dfe79487adf64a848a49dd07983b6614.jpg'
                },
                {
                    name: 'Donut',
                    number: 40,
                    price: 3,
                    image: 'https://cdn.britannica.com/38/230838-050-D0173E79/doughnuts-donuts.jpg'
                },
                {
                    name: 'Biscuit',
                    number: 0,
                    price: 5,
                    image: 'https://www.inspiredtaste.net/wp-content/uploads/2022/12/Homemade-Biscuits-1-1200.jpg'
                },
                {
                    name: 'Macarons',
                    number: 76,
                    price: 2,
                    image: 'https://www.foodandwine.com/thmb/G31FopBBodXHc8E5ZONG-47Dqos=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/200912-xl-chocolate-macarons-69edbba25e8b4d198509543cdbcbd8d3.jpg'
                },
                {
                    name: 'Mousse',
                    number: 4,
                    price: 5,
                    image: 'https://realfood.tesco.com/media/images/RFO-1400x919-classic-chocolate-mousse-69ef9c9c-5bfb-4750-80e1-31aafbd80821-0-1400x919.jpg'
                }
            ])
        )
    }),
)
export default mockWorker
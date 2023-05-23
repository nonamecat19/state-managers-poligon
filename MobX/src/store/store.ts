import {ItemType} from "../types/Item"
import {makeAutoObservable} from 'mobx'
import {Actions, State} from "./types"
import axios from "axios"
import {createViewModel} from 'mobx-utils'

class Store implements State, Actions{
    isLoading: boolean
    error: string
    money: number
    cart: ItemType[]
    data: ItemType[]

    constructor() {
        makeAutoObservable(this)
        this.isLoading = true
        this.error = ''
        this.money = 2000
        this.cart = []
        this.data = []
    }

    get totalPrice() {
        return this.cart.reduce((accumulator, current) => {
            return accumulator + current.price * current.number
        }, 0)
    }

    async fetchData() {
        this.isLoading = true
        axios.get<ItemType[]>('/items')
            .then((res) => {
                this.data = res.data

            })
            .catch((err) => {
                this.error = err.message
            })
            .finally(() => {
                this.isLoading = false
            })
    }

    cleanCart() {
        this.cart = []
    }

    buyProducts() {
        this.cart.forEach((el: ItemType) => {
            const element = this.data.find((el2: ItemType) => el.name === el2.name)
            if (element) {
                element.number -= el.number
            }
        })
        this.money -= this.totalPrice
        this.cart = []
    }

    addToCart(index: number) {
        const newItem = createViewModel(this.data[index])
        newItem.number = 1
        this.cart.push(newItem)
    }

    removeFromCart(index: number) {
        this.cart = this.cart.filter((el) => el.name !== this.data[index].name)
    }

    increaseProductCart(index: number) {
        const product = this.cart.find((el) => el.name === this.data[index].name)
        if (product) {
            product.number++
        }
    }

    decreaseProductCart(index: number) {
        const product = this.cart.find((el) => el.name === this.data[index].name)
        if (product) {
            product.number--
        }
    }
}
export default new Store()
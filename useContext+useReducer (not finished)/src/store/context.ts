import {createContext} from "react";
import {initialState} from "./reducer";


const ShopContext = createContext(initialState)
export default ShopContext
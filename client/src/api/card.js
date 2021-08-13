import { API_URL, PRODUCTS } from "../utils/constants";

export const addProductCartApi = (id) =>{
    const products = getCartApi();
    products.push(id);
    localStorage.setItem(PRODUCTS, JSON.stringify(products))
}

export const getCartApi = () =>{
    const products = localStorage.getItem(PRODUCTS)
    if(!products) return [];

    return JSON.parse(products)
}
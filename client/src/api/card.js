import { API_URL, PRODUCTS } from "../utils/constants";
import { uniqBy, countBy } from "lodash";

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

export const getProductsCartApi = async () =>{
    const idProducts = getCartApi();

    if(idProducts.length === 0) return null

    try{
        const products = [];
        for await (const idProduct of idProducts){
            const response = await fetch(`${API_URL}/products/${idProduct}`);
            const result = await response.json();
            products.push(result);
        }
        //console.log(products)

        const productsCount = countBy(products, (product) =>{
            return product.title
        })

        const combined = uniqBy(products, (product) =>{
            const productTemp = product;
            productTemp.quantity = productsCount[product.title];
           
            return productTemp.title;
        })

        return combined;

    }catch(error){
        console.error(`Error ${error}`)
        return null;
    }
}

export const deleteProductCartApi = (idProduct) =>{
    const products = getCartApi();

    const index = products.indexOf(idProduct);
    if(index > -1) products.splice(index,1);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export const deleteAllProductCartApi = (idProduct) =>{
    const products = getCartApi();

    const index = products.indexOf(idProduct);
    if(index > -1){
        products.splice(index,1);
        localStorage.setItem(PRODUCTS, JSON.stringify(products));
        deleteAllProductCartApi(idProduct)
    }
}

export const deleteCardApi = () =>{
    localStorage.removeItem(PRODUCTS)
}

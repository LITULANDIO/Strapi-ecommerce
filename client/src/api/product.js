import { API_URL } from "../utils/constants";

export const getProductsApi = async (limit = 1000) =>{
    try{
        const response = await fetch(`${API_URL}/products?_sort=created_at:desc&_limit=${limit}`);
        const result = await response.json();
        return result;
    }catch(error){
        console.error(`Error Products: ${error}`);
        return null;
    }
}

export const getProductCategory = async (category) =>{
    try{
        const response = fetch(`${API_URL}/products?_where[category.slug]=${category}&_sort=created_at:desc`);
        const result = await (await response).json();
        return result;
    }catch(error){
        console.error(`Error ${error}`);
        return null;
    }
}
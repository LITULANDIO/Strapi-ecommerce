import { API_URL } from "../utils/constants";

export const getCategoriesApi = async () =>{
    try{
        const response = await fetch(`${API_URL}/categories`);
        const result = await response.json();
        return result;
    }catch(error){
        console.error(`Error categories: ${error}`)
        return null;
    }
}
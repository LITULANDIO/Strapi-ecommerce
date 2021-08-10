import { API_URL } from "../utils/constants";

export const registerApi = async (formData) =>{
    try{
        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        };
        console.log('params', params)
        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    }catch(error){
        console.error(`${error}`)
        return null;
    }
}
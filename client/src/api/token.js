import { TOKEN } from "../utils/constants";

export const setTokenApi = (token) =>{
    localStorage.setItem(TOKEN, token)
}

export const getTokenApi = () =>{
    return localStorage.getItem(TOKEN)
}

export const deleteTokenApi = () =>{
    return localStorage.removeItem(TOKEN)
}
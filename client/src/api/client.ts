import axios from "axios"

const axiosInstance =  axios.create({
    baseURL: "//localhost:8080"
})

export async function get(url: string){
    try {
        return await (await axiosInstance.get(url)).data    
    } catch (error) {
        throw error
    }
}

export async function post(url: string, data?: any){
    return await axiosInstance.post(url, data)
}

export async function put(url: string, data?: any){
    return await axiosInstance.put(url, data)
}

export async function remove(url: string) {
    return await axiosInstance.delete(url)
}

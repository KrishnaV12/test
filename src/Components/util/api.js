import  { API_URL } from "../constants/constant"
import axios from "axios"

export async function getData(path) {
    const url = `${API_URL}/${path}`
    return await axios.get(url)
}
// import axios
import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});
//* CUSTOM METHOD GET
export const get = async (path, option = {} )=>{ // path nhận chuỗi url, option là object truyền key bên kia qua. Và không cần request.data.data 2 lần nữa
    const response = await request.get(path, option)
    return response.data
}

export default request
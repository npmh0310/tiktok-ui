//import tất cả trong request
import * as request from '~/utils/request';
export const search = async (q, type = 'less') => {
    try {
        //* USE AXIOS
        const res = await request.get('users/search', {
            params: {
                q, // giống như q: q (q lấy từ bên file index(search) với giá trị là debounced)
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
};

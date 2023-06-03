import axios from 'axios'

const responseInterceptor = (response) => {
    if (!response.data.errcode) {
        return response.data.data
    } else {
        return {
            code: response.data.errcode,
            message: response.data.errmsg
        }
    }
}

export const http = axios.create()

http.interceptors.response.use(responseInterceptor)
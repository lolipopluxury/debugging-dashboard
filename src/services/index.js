import { http } from '../utils/http'

export const apiFetchTbsData = (params) => {
    console.log(params)
    return http.get('/api/h5/debugging/x5/list', params)
}
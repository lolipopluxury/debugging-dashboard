import { http } from '../utils/http'

export const apiFetchTbsData = () => {
    return http.get('/api/h5/debugging/x5/list?category=css')
}
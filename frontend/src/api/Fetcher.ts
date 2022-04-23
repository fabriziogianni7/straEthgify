import axios from 'axios'
import { API_BASE_PATH } from '../config';

export const Fetcher = async (body: any) => {
    const res = await axios.post(API_BASE_PATH, body);
    const data = res.data;
    return data;
}
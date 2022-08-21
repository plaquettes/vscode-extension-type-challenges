import axios from 'axios';
import { API_PATH, GITHUB } from '../const/api';

const createAxios = (props = {}) => {
    return axios.create({
        baseURL: `${GITHUB}${API_PATH}`,
        withCredentials: true,
        ...props,
    });
};

const newAxios = createAxios();
const RETRY_TIME = 3;
const RETRY_DELAY = 1000;

newAxios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

newAxios.interceptors.response.use(
    res => {
        if (res.status !== 200) {
            
        } else {
            return Promise.resolve(res);
        }
    },
    err => {
        return Promise.reject(err);
    }
);

export const get = newAxios.get;
export const post = newAxios.post;

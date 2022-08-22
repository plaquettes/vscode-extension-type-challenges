import axios, { AxiosRequestConfig } from 'axios';
import {API_PATH, DEFAULT_REF, GITHUB} from '../const/api';

const createAxios = (props: AxiosRequestConfig = {}) => {
    return axios.create({
        baseURL: `${GITHUB}${API_PATH}`,
        withCredentials: true,
        timeout: 5000,
        ...props,
        params: {
            ...props.params,
            ref: DEFAULT_REF
        },
    });
};

const axiosInstance = createAxios();
const RETRY_TIME = 3;
const RETRY_DELAY = 1000;

axiosInstance.interceptors.request.use(
    config => {
        config.params.ref = DEFAULT_REF;

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    res => {
        if (res.status !== 200) {
            // @ts-ignore
            res.config.requestCount = res.config.requestCount || 0;

            // @ts-ignore
            if (res.config.requestCount < RETRY_TIME) {
                // @ts-ignore
                res.config.requestCount++;

                let retry = new Promise(resolve => {
                    setTimeout(() => {
                        resolve(res);
                    }, RETRY_DELAY || 100);
                });

                return retry.then(() => {
                    return axios(res.config);
                });
            }
        } else {
            return Promise.resolve(res);
        }
    },
    err => {
        return Promise.reject(err);
    }
);

export const get = axiosInstance.get;
export const post = axiosInstance.post;

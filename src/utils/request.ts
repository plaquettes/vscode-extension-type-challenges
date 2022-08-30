import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, DEFAULT_REF } from '../const/api';
import { warning } from './toast';

const createAxios = (props: AxiosRequestConfig = {}) => {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 5000,
    ...props,
    params: {
      ...props.params,
      ref: DEFAULT_REF
    }
  });
};

const axiosInstance = createAxios();
const RETRY_TIME = 10;
const RETRY_DELAY = 1000;

axiosInstance.interceptors.request.use(
  (config) => {
    config.params.ref = DEFAULT_REF;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      // @ts-ignore
      res.config.requestCount = res.config.requestCount || 0;

      // @ts-ignore
      if (res.config.requestCount < RETRY_TIME) {
        // @ts-ignore
        warning(`Retry ${res.config.requestCount} times`);
        // @ts-ignore
        res.config.requestCount++;

        let retry = new Promise((resolve) => {
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
  (err) => {
    return Promise.reject(err);
  }
);

export const get = axiosInstance.get;
export const post = axiosInstance.post;

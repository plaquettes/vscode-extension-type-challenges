import * as jsonPath from 'jsonpath';
import {get} from '../utils/request';

// TODO: test(04484-medium-istuple)
export const getContent = (name: string = '04484-medium-istuple') => {
    return get(`/contents/questions/${name}`, {
        transformResponse: [
            data => {
                console.log(data);
                const json = JSON.parse(data);
                const extensionsUrl = jsonPath.query(json, '$[*].url');
                return extensionsUrl;
            },
        ],
    });
};

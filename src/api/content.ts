import { get } from '../utils/request';

// TODO: test(04484-medium-istuple)
export const getQuestions = (name: string) => {
    return get(`/questions/${name}/README.md`, {
        data: {
            ref: 'main'
        }
    });
};
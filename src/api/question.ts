import { get } from '../utils/request';

export const getQuestions = () => {
    return get('/questions', {
        data: {
            ref: 'main'
        }
    });
};
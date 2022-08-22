import { DEFAULT_REF } from '../const/api';
import {get} from '../utils/request';

export interface QuestionProps {
    download_url?: string;
    git_url?: string;
    html_url?: string;
    label?: string;
    name?: string;
    mode?: string;
    path?: string;
    sha?: string;
    size?: number;
    type?: string;
    url?: string;
}

export const getQuestions = () => {
    return get('/contents/questions');
};

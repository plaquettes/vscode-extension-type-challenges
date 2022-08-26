import { get } from '../utils/request';

export interface QuestionProps {
  content?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  download_url?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  git_url?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  html_url?: string;
  label: string;
  name: string;
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
}

export const getQuestions = () => {
  return get('/contents/questions');
};

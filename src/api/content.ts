import { get } from '../utils/request';

export interface ReadMeInfoProps {
  content?: string;
  name?: string;
  label?: string;
}

export const getReadMeInfo = (name: string) => {
  return get(`/contents/questions/${name}/README.zh-CN.md`, {
    data: {
      ref: 'main'
    },
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; application/vnd.github+json;'
    }
  });
};

export const encodeContent = (content: string) => {
  return Buffer.from(content ?? '', 'base64').toString();
};

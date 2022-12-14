import * as MarkdownIt from 'markdown-it';
import { EXTERNAL_URL_RE } from '../shared';

export const imagePlugin = (md: MarkdownIt) => {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const url = token.attrGet('src');

    if (url && !EXTERNAL_URL_RE.test(url) && !/^\.?\//.test(url)) {
      token.attrSet('src', './' + url);
    }

    if (token.attrIndex('alt') && token.children != null) {
      token.attrs![token.attrIndex('alt')][1] = self.renderInlineAsText(
        token.children,
        options,
        env
      );
    }

    return self.renderToken(tokens, idx, options);
  };
};

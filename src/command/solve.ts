import * as vscode from 'vscode';
import { encodeContent, getReadMeInfo } from '../api/content';
import { success } from '../utils/toast';
import { typeChallengesPreviewProvider } from '../webview/TypeChallengesPreviewProvider';

export const pick = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'type-challenges.SolveQuestion',
      async (node) => {
        success(`${node.label} is fetching!!! Hold on please.`);

        const data = await getReadMeInfo(node.name).then((res) => {
          res.data.content = encodeContent(res.data.content)!;

          return res.data;
        });

        typeChallengesPreviewProvider.show({
          ...data,
          label: node.label
        });
      }
    )
  );
};

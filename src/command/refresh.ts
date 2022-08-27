import * as vscode from 'vscode';
import { TypeChallengesTreeProvider } from '../explorer/TypeChallengesTreeProvider';

export const refresh = (
  context: vscode.ExtensionContext,
  typeChallengesTreeProvider: TypeChallengesTreeProvider
) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('type-challenges.refresh', async (node) => {
      await typeChallengesTreeProvider.refresh();
    })
  );
};

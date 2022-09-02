import * as vscode from 'vscode';

import { TypeChallengesTreeProvider } from './explorer/TypeChallengesTreeProvider';
import { initTypeChallengesPreview } from './webview/TypeChallengesPreviewProvider';
import { pick } from './command/pick';
import { refresh } from './command/refresh';

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "type-challenges" is now active!'
  );

  const typeChallengesTreeProvider =
    TypeChallengesTreeProvider.initTreeViewItem(context);

  pick(context);
  refresh(context, typeChallengesTreeProvider);
  initTypeChallengesPreview(context);
}

export function deactivate() {}

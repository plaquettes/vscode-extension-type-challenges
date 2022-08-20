import * as vscode from 'vscode';

import {
    TreeViewProvider,
} from './TreeViewProvider';
import { success } from './utils/toast';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "type-challenges" is now active!');

    TreeViewProvider.initTreeViewItem();

    context.subscriptions.push(
        vscode.commands.registerCommand('type-challenges.itemClick', label => {
            success(label);
        })
    );
}

export function deactivate() {}

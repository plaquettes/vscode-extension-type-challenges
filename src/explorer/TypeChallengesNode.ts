import * as path from 'path';
import {Command, ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri} from 'vscode';

export class TypeChallengesNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }

    public get previewCommand(): Command {
        return {
            title: this.label,
            command: 'type-challenges.selectedQuestion',
            tooltip: this.label,
            arguments: [this],
        };
    }

    // @ts-ignore
    public get iconPath() {
        return {
            light: path.join(__filename, '../', 'public', 'assets', 'question.svg'),
            dark: path.join(__filename, '../', 'public', 'assets', 'question.svg'),
        };
    }

    public get uri(): Uri {
        return Uri.from({
            scheme: 'type-challenges',
            authority: 'tree-node',
            path: `/${this.label}`, // path must begin with slash /
        });
    }
}

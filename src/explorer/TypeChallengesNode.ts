import * as path from 'path';
import {Command, ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri} from 'vscode';
import {QuestionProps} from '../api/question';

export class TypeChallengesNode {
    data: QuestionProps;

    constructor(data: QuestionProps) {
        this.data = data;
    }

    public get label(): string {
        return this.data.label;
    }

    public get name(): string {
        return this.data.name;
    }

    public get previewCommand(): Command {
        return {
            title: 'Preview Question',
            command: 'type-challenges.pickQuestion',
            arguments: [this],
        };
    }

    public get iconPath(): string | Uri | {light: string | Uri; dark: string | Uri} | ThemeIcon {
        return path.join(__filename, '../../', 'public', 'assets', 'question.svg');
    }

    public get uri(): Uri {
        return Uri.from({
            scheme: 'type-challenges',
            path: `/${this.label}`, // path must begin with slash /
        });
    }
}

// export class TypeChallengesNode extends TreeItem {
//     constructor(
//         public readonly label: string,
//         public readonly collapsibleState: TreeItemCollapsibleState
//     ) {
//         super(label, collapsibleState);
//     }

//     iconPath = {
//         light: path.join(__filename, '../', 'public', 'assets', 'question.svg'),
//         dark: path.join(__filename, '../', 'public', 'assets', 'question.svg'),
//     };

//     command = {
//         title: this.label,
//         command: 'type-challenges.pickQuestion',
//         tooltip: this.label,
//         arguments: [this],
//     };

//     public get uri(): Uri {
//         return Uri.from({
//             scheme: 'type-challenges',
//             authority: 'tree-node',
//             path: `/${this.label}`, // path must begin with slash /
//         });
//     }
// }

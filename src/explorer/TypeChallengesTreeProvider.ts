import {
    TreeItem,
    TreeDataProvider,
    window,
    EventEmitter,
    Event,
    ExtensionContext,
} from 'vscode';

import { getQuestions, QuestionProps } from '../api/question';
import { getContent } from '../api/content';
import { TypeChallengesNode } from './TypeChallengesNode';

const formatName = (name: string = '') => {
    const current = name.split('-');
    current[0] = `${Number(current[0])}`;

    return current.join(' ');
};

export class TypeChallengesTreeProvider implements TreeDataProvider<TypeChallengesNode> {
    protected readonly viewType: string = 'typeChallenges.TreeView';

    // @ts-ignore
    private context: ExtensionContext;

    private onDidChangeTreeDataEvent: EventEmitter<TypeChallengesNode | undefined | null> =
        new EventEmitter<TypeChallengesNode | undefined | null>();

    public readonly onDidChangeTreeData: Event<TypeChallengesNode | null | undefined> =
        this.onDidChangeTreeDataEvent.event;

    public initialize(context: ExtensionContext): void {
        this.context = context;
    }

    public async refresh(): Promise<void> {
        this.onDidChangeTreeDataEvent.fire(null);
    }

    getTreeItem(element: TypeChallengesNode): TreeItem | Thenable<TreeItem> {
        return {
            ...element,
            command: element.previewCommand
        };
    }

    getChildren(
        element?: TypeChallengesNode | undefined
    ): import('vscode').ProviderResult<TypeChallengesNode[]> {
        console.log(element);
        return getQuestions().then(({data}) => {
            return (data ?? []).map((q: QuestionProps) => ({
                ...q,
                label: formatName(q.name),
            }));
        });
    }

    public static initTreeViewItem() {
        const typeChallengesTreeProvider = new TypeChallengesTreeProvider();
        // getContent().then(res => {
        //     console.log(res);
        // });

        window.registerTreeDataProvider('typeChallenges', typeChallengesTreeProvider);
    }
}

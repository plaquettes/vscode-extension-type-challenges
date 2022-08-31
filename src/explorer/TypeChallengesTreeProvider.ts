import {
  TreeItem,
  TreeDataProvider,
  window,
  EventEmitter,
  Event,
  ExtensionContext,
  TreeItemCollapsibleState
} from 'vscode';

import { getQuestions, QuestionProps } from '../api/question';
import { error } from '../utils/toast';
import { TypeChallengesNode } from './TypeChallengesNode';

const formatName = (name: string = '') => {
  const current = name.split('-');
  current[0] = `${Number(current[0])}`;

  return current.join(' ');
};

export class TypeChallengesTreeProvider
  implements TreeDataProvider<TypeChallengesNode>
{
  protected readonly viewType: string = 'typeChallenges.TreeView';

  private context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  private onDidChangeTreeDataEvent: EventEmitter<
    TypeChallengesNode | undefined | null
  > = new EventEmitter<TypeChallengesNode | undefined | null>();

  public readonly onDidChangeTreeData: Event<
    TypeChallengesNode | null | undefined
  > = this.onDidChangeTreeDataEvent.event;

  public initialize(context: ExtensionContext): void {
    this.context = context;
  }

  public async refresh(): Promise<void> {
    this.getChildren();

    this.onDidChangeTreeDataEvent.fire(null);
  }

  getTreeItem(element: TypeChallengesNode): TreeItem | Thenable<TreeItem> {
    return {
      label: element.label ?? element.name,
      // collapsibleState: TreeItemCollapsibleState.Collapsed,
      iconPath: element.iconPath,
      command: element.previewCommand,
      resourceUri: element.uri
    };
  }

  getChildren(
    element?: TypeChallengesNode | undefined
  ): import('vscode').ProviderResult<TypeChallengesNode[]> {
    // TODO: cache and read it.

    return getQuestions()
      .then(({ data }) => {
        return (data ?? []).map(
          (q: QuestionProps) =>
            new TypeChallengesNode({
              ...q,
              label: formatName(q.name)
            })
        );
      })
      .catch((err) => {
        error(err?.message ?? err);
      });
  }

  public static initTreeViewItem(
    context: ExtensionContext
  ): TypeChallengesTreeProvider {
    const typeChallengesTreeProvider = new TypeChallengesTreeProvider(context);

    window.registerTreeDataProvider(
      'type-challenges',
      typeChallengesTreeProvider
    );

    return typeChallengesTreeProvider;
  }
}

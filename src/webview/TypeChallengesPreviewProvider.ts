import { commands, ExtensionContext, ViewColumn } from 'vscode';
import {
  ITypeChallengesWebviewOption,
  TypeChallengesWebview
} from './TypeChallengesWebview';
import { markdown } from '../markdown/markdown';
import { QuestionProps } from '../api/question';

interface WebViewMessageProps {
  command: string;
}

class TypeChallengesPreviewProvider extends TypeChallengesWebview {
  protected readonly viewType: string = 'type-challenges.preview';
  private node!: QuestionProps;

  constructor() {
    super();
  }

  public show(node: QuestionProps): void {
    this.node = node;

    this.showWebviewInternal();
  }

  protected getWebviewOption(): ITypeChallengesWebviewOption {
    return {
      title: this.node.label ? `Q${this.node.label}` : 'Question',
      viewColumn: ViewColumn.Active,
      preserveFocus: true
    };
  }

  protected async getWebviewContent(): Promise<string> {
    const button: { element: string; script: string; style: string } = {
      element: `<button id="solve">Code Now</button>`,
      script: `const button = document.getElementById('solve');
              button.onclick = () => vscode.postMessage({
                  command: 'SolveQuestion',
              });`,
      style: `<style>
          #solve {
              position: fixed;
              bottom: 1rem;
              right: 1rem;
              border: 0;
              margin: 1rem 0;
              padding: 0.3rem 1.5rem;
              color: white;
              border-radius: 10px;
              cursor: pointer;
              background-color: var(--vscode-button-background);
          }
          #solve:hover {
              background-color: var(--vscode-button-hoverBackground);
          }
          #solve:active {
              border: 0;
          }
          </style>`
    };

    const getTitle = markdown.then(({ render }) =>
      render([`# 加油，好好干`].join('\n'))
    );

    const getContent = markdown.then(({ render }) =>
      render(this.node.content ?? 'Not fetch the question')
    );

    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource: 'unsafe-inline'; style-src vscode-resource: 'unsafe-inline';"/>
          ${button.style}
          <style>
            body {
              padding: 2em;
            }
            pre {
              background: #282A36;
              padding: 1em;
              border-radius: 0.5em;
            }
            code {
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          ${button.element}
          ${title}
          ${content}
        </body>
        <script>
            const vscode = acquireVsCodeApi();
            ${button.script}
        </script>
        </html>
    `;
  }

  protected onDidDisposeWebview(): void {
    super.onDidDisposeWebview();
  }

  protected async onDidReceiveMessage(
    message: WebViewMessageProps
  ): Promise<void> {
    switch (message.command) {
      case 'ShowProblem': {
        await commands.executeCommand('TypeChallenges.showProblem', this.node);
        break;
      }
    }
  }

  private async showMarkdownConfigHint(): Promise<void> {}
}

export const typeChallengesPreviewProvider: TypeChallengesPreviewProvider =
  new TypeChallengesPreviewProvider();

export const initTypeChallengesPreview = (context: ExtensionContext) => {
  context.subscriptions.push(typeChallengesPreviewProvider);
};

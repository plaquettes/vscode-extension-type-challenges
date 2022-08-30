import * as vscode from 'vscode';

const DEFAULT_MESSAGE_OPTIONS = {};

export const success = (
  message: string,
  options: vscode.MessageOptions = DEFAULT_MESSAGE_OPTIONS
) => {
  vscode.window.showInformationMessage(
    message,
    Object.assign(DEFAULT_MESSAGE_OPTIONS, options)
  );
};

export const warning = (
  message: string,
  options: vscode.MessageOptions = DEFAULT_MESSAGE_OPTIONS
) => {
  vscode.window.showWarningMessage(
    message,
    Object.assign(DEFAULT_MESSAGE_OPTIONS, options)
  );
};

export const error = (
  message: string,
  options: vscode.MessageOptions = DEFAULT_MESSAGE_OPTIONS
) => {
  vscode.window.showErrorMessage(
    message,
    Object.assign(DEFAULT_MESSAGE_OPTIONS, options)
  );
};

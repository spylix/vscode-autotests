import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("autotests.runTests", () => {
    const { workspace, window } = vscode;
    const { terminals } = window;
    const command = workspace.getConfiguration().get("autotests.testCommand");
    const activeTab: unknown = window.tabGroups.activeTabGroup.activeTab?.input;
    const currentFileRelativePath = workspace.asRelativePath(
      (activeTab as { uri: string })?.uri
    );
    let terminalIndex = terminals.findIndex((t) => t.name === "tests");

    if (terminalIndex === -1) {
      window.createTerminal("tests");
      terminalIndex = terminals.findIndex((t) => t.name === "tests");
    }

    terminals[terminalIndex].show();
    terminals[terminalIndex].sendText(`${command} ${currentFileRelativePath}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

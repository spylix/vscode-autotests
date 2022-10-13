import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "autotests.runTests",
    ({ path }) => {
      const { terminals } = vscode.window;
      const command = vscode.workspace
        .getConfiguration()
        .get("autotests.testCommand");
      const terminalIndex = terminals.findIndex((t) => t.name === "tests");
      let terminal = terminals[terminalIndex];

      if (terminalIndex === -1 || !terminal) {
        terminal = vscode.window.createTerminal("tests");
      }

      terminal.show();
      terminal.sendText(`${command} ${path}`);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

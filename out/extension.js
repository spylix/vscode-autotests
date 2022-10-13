"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand("autotests.runTests", ({ path }) => {
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
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
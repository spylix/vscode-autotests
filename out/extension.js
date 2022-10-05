"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand("autotests.runTests", () => {
        const { workspace, window } = vscode;
        const { terminals } = window;
        const command = workspace.getConfiguration().get("autotests.testCommand");
        const activeTab = window.tabGroups.activeTabGroup.activeTab?.input;
        const currentFileRelativePath = workspace.asRelativePath(activeTab?.uri);
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
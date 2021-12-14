// -----JS CODE-----
// @input Component.Text instructions
// @input Component.Text debug
// @input Component.Text result
// @input bool showDebug = true

global.hud = script;

script.hideInstructions = function () {
    script.instructions.text = "";
}

script.showInstructions = function (text) {
    script.instructions.text = text;
}

script.hideInstructions();

script.hideDebug = function () {
    script.debug.text = "";
}

script.showDebug = function (text) {
    if (script.showDebug === true) {
        script.debug.text = text;
    }
}

script.hideDebug();

script.hideResult = function () {
    script.result.text = "";
}

script.showResult = function (text) {
    script.result.text = text;
}

script.hideResult();

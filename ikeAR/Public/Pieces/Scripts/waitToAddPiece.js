// -----JS CODE-----
// @input Component.ScriptComponent pieceAddScript

script.activate = function () {
    script.touchStartEvent = script.createEvent("TapEvent");
    script.touchStartEvent.bind(script.handleTouchStart);
    global.hud.showInstructions("Tap to place next piece");
}

script.handleTouchStart = function () {
    global.hud.hideInstructions();
    script.removeEvent(script.touchStartEvent);
    
    // Always activate the next state last
    script.pieceAddScript.activate();
}

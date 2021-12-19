// -----JS CODE-----
// @input Component.ScriptComponent setPowerScript

script.activate = function () {
    script.touchStartEvent = script.createEvent("TouchStartEvent");
    script.touchStartEvent.bind(script.handleTouchStart);
    global.hud.showInstructions("Press to Start Throw\nHold to Set Power");
}

script.handleTouchStart = function () {
    global.hud.hideInstructions();
    script.removeEvent(script.touchStartEvent);
    
    // Always activate the next state last
    script.setPowerScript.activate();
}

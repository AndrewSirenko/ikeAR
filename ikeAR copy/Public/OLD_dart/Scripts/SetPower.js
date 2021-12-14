// -----JS CODE-----
// @input Component.ScriptComponent waitToStartScript
// @input Component.ScriptComponent throwDartScript
// This determines how long it takes for the bar to go from min to max (and max to min)
// @input float cycleDuration = 1

script.startTime = 0;
script.timer = 0;
script.power = 0;
script.direction = 1;
script.isActive = false;

script.activate = function () {
    script.startTime = getTime();
    script.timer = 0;
    script.updateEvent = script.createEvent("UpdateEvent");
    script.updateEvent.bind(script.handleUpdate);
    script.touchEndEvent = script.createEvent("TouchEndEvent");
    script.touchEndEvent.bind(script.handleTouchEnd);
    script.isActive = true;
    global.hud.showInstructions("Hold to Set Power");    
}

script.handleUpdate = function () {
    script.timer += getDeltaTime() * script.direction;
    
    // Clamp timer to 0 and cycleDuration
    script.timer = Math.min(Math.max(script.timer, 0), script.cycleDuration);

    // Invert direction if we've reached min or max
    if (script.timer <= 0 || script.timer >= script.cycleDuration) {
        script.direction *= -1;
    }
    
    script.power = script.timer / script.cycleDuration;
}

script.handleTouchEnd = function () {
    global.hud.hideInstructions();
    script.removeEvent(script.touchEndEvent);
    script.removeEvent(script.updateEvent);
    script.isActive = false;

    // Always activate the next state last
    
    // Make sure they have pressed for more than a frame or two to trigger a launch
    var touchDuration = getTime() - script.startTime;
    if (touchDuration > 0.2) {
        script.throwDartScript.activate(script.power);
    }
    else {
        script.waitToStartScript.activate();
    }
}

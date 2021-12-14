// -----JS CODE-----
// @input Component.ScriptComponent waitToStartThrowScript
// @input Component.ScriptComponent dartController

script.updateEvent;
script.activeDartScript;

script.activate = function (power) {
    script.activeDartScript = script.dartController.fire(power);
    script.updateEvent = script.createEvent("UpdateEvent");
    script.updateEvent.bind(script.handleUpdate);
}

script.handleUpdate = function () {
    if (script.activeDartScript.hasStopped) {
        script.removeEvent(script.updateEvent);
        
        // Always activate the next state last
        script.waitToStartThrowScript.activate();
    }
}

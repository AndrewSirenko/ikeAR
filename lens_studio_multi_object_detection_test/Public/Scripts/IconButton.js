// IconButton.js
// Version: 0.0.1
// Event: OnAwake
// Description: Enables or disables a class of objects from being detected.

//@input Component.Script frameBuilder
//@input string label


var transform = null;
var enabled = false;


function init() {
    transform = script.getSceneObject().getComponent("Component.ScreenTransform");
    if (!transform) {
        print("Error: ScreenTransform component not found!");
        return;
    }

    if (!script.frameBuilder) {
        print("Error: Frame builder not set!");
        return;
    }

    script.createEvent("TouchEndEvent").bind(onTouch);
}


function onTouch(touchData) {
    var pos = touchData.getTouchPosition();
    if (!transform.containsScreenPoint(pos)) {
        return;
    }
    
    enabled = !enabled;
    if (enabled) {
        script.frameBuilder.api.disableLabel(script.label);
        print(script.label + " tracking disabled.");
    } else {
        script.frameBuilder.api.enableLabel(script.label);
        print(script.label + " tracking enabled.");
    }

}


init();

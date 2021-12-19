// -----JS CODE-----
// @input Component.ScriptComponent dartboardControllerScript
// @input Component.ScriptComponent dartsManagerScript

const PLACE_DARTBOARD = 0;
const THROW_DART = 1;
script.state = PLACE_DARTBOARD;

script.createEvent("OnStartEvent").bind(function () {
    script.dartboardControllerScript.activate();
});

script.createEvent("UpdateEvent").bind(function () {
    switch (script.state) {
        case PLACE_DARTBOARD:
            if (script.dartboardControllerScript.isComplete) {
                script.dartsManagerScript.activate();
                script.state = THROW_DART;
            }
            break;
    }
});

// -----JS CODE-----
// @input Component.ScriptComponent buildLocationControllerScript
// @input Component.ScriptComponent piecesManagerScript

const SELECT_LOCATION = 0;
const MANAGE_PIECES = 1;
script.state = SELECT_LOCATION;

script.createEvent("OnStartEvent").bind(function () {
    script.buildLocationControllerScript.activate();
});

script.createEvent("UpdateEvent").bind(function () {
    switch (script.state) {
        case SELECT_LOCATION:
            if (script.buildLocationControllerScript.isComplete) {
                script.piecesManagerScript.activate();
                script.state = MANAGE_PIECES;
            }
            break;
    }
});

// MarkerController.js
// Version: 0.0.3
// Event: Lens Initialized
// Description: Controls the marker found and lost behavior.

// @input bool advanced = false
// @input Component.MarkerTrackingComponent marker {"showIf": "advanced"}
// @input Component.ScriptComponent crossHintScript {"showIf": "advanced"}
// @input Component.ScriptComponent fadeEffectScript {"showIf": "advanced"}
// @input Component.ScriptComponent hintControllerScript {"showIf": "advanced"}

function onLensTurnOnEvent() {
    if (script.fadeEffectScript) {
        if (script.fadeEffectScript.api.resetFadeEffect) {
            script.fadeEffectScript.api.resetFadeEffect();
        }
    }
}
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(onLensTurnOnEvent);

script.marker.onMarkerFound = wrapFunction(script.marker.onMarkerFound, function() {
    if (script.hintControllerScript) {
        if (script.hintControllerScript.api.hide) {
            script.hintControllerScript.api.hide();
        }
    } else {
        print("MarkerController: Please assign hint controller");
    }

    if (script.crossHintScript) {
        if (script.crossHintScript.api.startCrossAnimation) {
            script.crossHintScript.api.startCrossAnimation();
        }
    } else {
        print("MarkerController: Please assign cross hint");
    }

    var markerObject = script.marker.getSceneObject();
    if (markerObject) {
        for (var i = 0; i < markerObject.getChildrenCount(); i++) {
            var childObject = markerObject.getChild(i);
            var scriptComponents = childObject.getComponents("Component.ScriptComponent");
            for (var j = 0; j < scriptComponents.length; j++) {
                var objectsScript = scriptComponents[j];

                if (objectsScript.api) {
                    if (objectsScript.api.onMarkerFound) {
                        objectsScript.api.onMarkerFound();
                    }
                }
            }
        }
    }
    if (script.fadeEffectScript) {
        if (script.fadeEffectScript.api.startFade) {
            script.fadeEffectScript.api.startFade();
        }
    }
});

script.marker.onMarkerLost = wrapFunction(script.marker.onMarkerLost, function() {
    if (script.hintControllerScript) {
        if (script.hintControllerScript.api.show) {
            script.hintControllerScript.api.show();
        }
    } else {
        print("MarkerController: Please assign hint controller");
    }

    var markerObject = script.marker.getSceneObject();
    if (markerObject) {
        for (var i = 0; i < markerObject.getChildrenCount(); i++) {
            var childObject = markerObject.getChild(i);
            var scriptComponents = childObject.getComponents("Component.ScriptComponent");
            for (var j = 0; j < scriptComponents.length; j++) {
                var objectsScript = scriptComponents[j];

                if (objectsScript.api) {
                    if (objectsScript.api.onMarkerLost) {
                        objectsScript.api.onMarkerLost();
                    }
                }
            }
        }
    }
    if (script.fadeEffectScript) {
        if (script.fadeEffectScript.api.resetFadeEffect) {
            script.fadeEffectScript.api.resetFadeEffect();
        }
    }
});

function wrapFunction(origFunc, newFunc) {
    if (!origFunc) {
        return newFunc;
    }
    return function() {
        origFunc();
        newFunc();
    };
}

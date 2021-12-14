// -----JS CODE-----
// @input SceneObject cameraObject
// @input SceneObject buildLocationContainer
// @input float lerpValue = 0.3
// @input bool activateSelf
// @input bool placeInFrontOfCamera

script.updateEvent = script.createEvent("UpdateEvent");
script.isComplete = false;

script.activate = function () {
    if (script.placeInFrontOfCamera === true) {
        var cameraTransform = script.cameraObject.getTransform();
        var position = cameraTransform.getWorldPosition();
        position = position.add(cameraTransform.back.uniformScale(200));
        script.buildLocationContainer.getTransform().setWorldPosition(position);
        script.buildLocationContainer.getTransform().setWorldRotation(cameraTransform.getWorldRotation());
        script.isComplete = true;
    }
    else {
        global.planeTracker.start();
        script.updateEvent.bind(script.handleUpdate);    
    }
}

script.createEvent("TapEvent").bind(function () {
    if (global.planeTracker.isActive && global.planeTracker.isValid()) {
        global.planeTracker.stop();
        script.removeEvent(script.updateEvent);
        global.hud.hideInstructions();
        script.isComplete = true;
    }
});

script.handleUpdate = function () {
    if (global.planeTracker.isValid()) {
        script.buildLocationContainer.enabled = true;
        global.hud.showInstructions("Tap to set your build location");
        var positionA = script.buildLocationContainer.getTransform().getWorldPosition();
        var positionB = global.planeTracker.position;
        script.buildLocationContainer.getTransform().setWorldPosition(vec3.lerp(positionA, positionB, script.lerpValue));
        var rotationA = script.buildLocationContainer.getTransform().getWorldRotation();
        var rotationB = global.planeTracker.rotation;
        script.buildLocationContainer.getTransform().setWorldRotation(quat.slerp(rotationA, rotationB, script.lerpValue));
    }
    else {
        script.buildLocationContainer.enabled = false;
        global.hud.showInstructions("Find horizontal surface to build on");
    }
}

script.createEvent("OnStartEvent").bind(function () {
    if (script.activateSelf === true) {
        script.activate();
    }    
});

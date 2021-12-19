// -----JS CODE-----
// @input SceneObject cameraObject
// @input SceneObject dartboardContainer
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
        script.dartboardContainer.getTransform().setWorldPosition(position);
        script.dartboardContainer.getTransform().setWorldRotation(cameraTransform.getWorldRotation());
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
        script.dartboardContainer.enabled = true;
        global.hud.showInstructions("Tap to Place Dartboard");
        var positionA = script.dartboardContainer.getTransform().getWorldPosition();
        var positionB = global.planeTracker.position;
        script.dartboardContainer.getTransform().setWorldPosition(vec3.lerp(positionA, positionB, script.lerpValue));
        var rotationA = script.dartboardContainer.getTransform().getWorldRotation();
        var rotationB = global.planeTracker.rotation;
        script.dartboardContainer.getTransform().setWorldRotation(quat.slerp(rotationA, rotationB, script.lerpValue));
    }
    else {
        script.dartboardContainer.enabled = false;
        global.hud.showInstructions("Find a Wall");
    }
}

script.createEvent("OnStartEvent").bind(function () {
    if (script.activateSelf === true) {
        script.activate();
    }    
});

script.getDistanceToPlayer = function () {
    var camera = script.cameraObject.getTransform().getWorldPosition();
    var board = script.dartboardContainer.getTransform().getWorldPosition();
    camera.y = board.y;
    return camera.distance(board);
    //hud.showDebug("Dist: " + script.distance.toFixed(2));

}
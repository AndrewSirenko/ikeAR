// -----JS CODE-----
// @input SceneObject cameraObject
// @input Asset.ObjectPrefab dartPrefab
// @input Component.ScriptComponent waitToStartThrowScript
// @input float minPower = 250
// @input float maxPower = 500
// This is how much the dart is angled up on launch. Zero is straight out.
// @input float angleUp = 5
// @input bool activateSelf

script.dartObjects = [];

// Convert angle to radians
script.angleUp *= Math.PI / 180;

script.activate = function () {
    script.waitToStartThrowScript.activate();
}

script.fire = function (power) {
    // Instantiate dart
    var dart = script.dartPrefab.instantiate(null);
    script.dartObjects.push(dart);
    
    // Set pose
    var cameraTransform = script.cameraObject.getTransform();
    dart.getTransform().setWorldPosition(cameraTransform.getWorldPosition());
    var forward = cameraTransform.back;
    var up = cameraTransform.up;
    var rotation = quat.lookAt(forward, up);

    // Tilt the dart up so it has a nice parabolic arc
    var rotationUp = quat.angleAxis(script.angleUp, rotation.multiplyVec3(vec3.left()));
    rotation = rotationUp.multiply(rotation);
    dart.getTransform().setWorldRotation(rotation);

    // Set forward direction
    var forward = rotation.multiplyVec3(vec3.forward());
    
    // Set speed
    var dartScript = dart.getComponent("Component.ScriptComponent");
    var delta = script.maxPower - script.minPower;
    var speed = script.minPower + delta * power;
    
    //dartScript.throw(forward, speed);
    dartScript.throw(forward, speed);
    
    return dartScript;
}

script.createEvent("OnStartEvent").bind(function () {
    if (script.activateSelf === true) {
        script.activate();
    }    
});

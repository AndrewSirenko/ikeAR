// -----JS CODE-----
// @input SceneObject handleObject
// @input Component.AudioComponent swishSound
// @input Component.AudioComponent thumpSound

script.velocity = vec3.zero();
script.gravity = vec3.up().uniformScale(-98.7);
script.hasStopped = false;
script.roll = 0;
script.rollSpeed = 2 + Math.random() * 5;

// This is how many seconds the dart will fly if there's no dartboard.
script.flightTimeWithoutDartboard = 1.5;

// Use this if you are trying to hold the dart by the barrel, e.g. with two fingers tracked in 3D space.
// Note that rotation must be set prior to this.
script.setHandlePosition = function (value) {
    var forward = script.getTransform().getWorldRotation().multiplyVec3(vec3.back());
    var position = value.add(forward.uniformScale(script.handleObject.getTransform().getLocalPosition().z));
    script.getTransform().setWorldPosition(position);
}

// Set direction and speed. NOTE: Does not set rotation!
script.throw = function (direction, speed) {
    script.velocity = direction.normalize().uniformScale(speed);
    script.swishSound.play(0);
    script.onUpdate = script.createEvent("UpdateEvent");
    script.onUpdate.bind(script.processFlight);
}

script.processFlight = function () {
    // Add gravity to velocity and determine next position
    script.velocity = script.velocity.add(script.gravity.uniformScale(getDeltaTime()));
    var currentPosition = script.getTransform().getWorldPosition();
    var nextPosition = currentPosition.add(script.velocity.uniformScale(getDeltaTime()));

    // Rotate to face velocity
    var direction = quat.lookAt(script.velocity.normalize(), vec3.up());
    
    // Add roll to rotation (it's just a visual effect)
    script.roll += script.rollSpeed * getDeltaTime();
    var axis = direction.multiplyVec3(vec3.forward());
    var rotation = quat.angleAxis(script.roll, axis).multiply(direction);
    
    // Set rotation
    script.getTransform().setWorldRotation(rotation);

    // If there's a dartboard we can collide with, see if it's been hit
    if (global.dartboard) {

        // Get the dart position, which is the tip
        var dartPosition = script.getTransform().getWorldPosition(); 
        
        // Get the position of the dart relative to the dartboard (i.e. in its local space)
        var boardMatrix = global.dartboard.getTransform().getInvertedWorldTransform();
        var relativePosition = boardMatrix.multiplyPoint(dartPosition);
        
        // If local Z is less than zero, it has crossed the plane of the target.
        // Find the intersection and stop the dart there.
        if (relativePosition.z <= 0) {
            var planePoint = global.dartboard.getTransform().getWorldPosition();
            var planeNormal = global.dartboard.getTransform().forward;
            var linePoint = dartPosition;
            var lineDirection = script.velocity.normalize();
            var point = global.linePlaneIntersection(planePoint, planeNormal, linePoint, lineDirection);
            if (point !== undefined) {
                nextPosition = point;
                global.scoreboard.handleHit(point);
                script.thumpSound.play(0);
                script.stopFlight();
            }
            else {
                print("intersection undefined");
            }
        }
    }
    // Otherwise, decrease our flight lifetime until it hits zero
    else {
        script.flightTimeWithoutDartboard -= getDeltaTime();
        if (script.flightTimeWithoutDartboard <= 0) {
            script.stopFlight();
        }
    }
    
    // Update the position of the dart
    script.getTransform().setWorldPosition(nextPosition);
    
}

script.stopFlight = function () {
    script.removeEvent(script.onUpdate);
    script.hasStopped = true;
}


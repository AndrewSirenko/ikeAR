// -----JS CODE-----
// Add to object in the scene and then use the center of the frustum to test scores on the dartboard

// @input SceneObject cameraObject
// @input SceneObject dartboardObject

script.targetTransform = script.dartboardObject.getTransform();
script.headTransform = script.cameraObject.getTransform();
global.dartboard.printRanges();

script.createEvent("UpdateEvent").bind(function () {
    /*
     * @param planePoint    A point on the plane.
     * @param planeNormal   The normal vector of the plane.
     * @param linePoint     A point on the line.
     * @param lineDirection The direction vector of the line.
    */
        
    var planeNormal = script.targetTransform.getWorldRotation().multiplyVec3(vec3.up());
    var lineDirection = script.headTransform.getWorldRotation().multiplyVec3(vec3.back());
    var facingDot = planeNormal.dot(lineDirection);
    var isFacingTarget = facingDot < 0;

    if (isFacingTarget === true)
    {
        var planePoint = script.targetTransform.getWorldPosition();
        var linePoint = script.headTransform.getWorldPosition();
        var intersection = linePlaneIntersection(planePoint, planeNormal, linePoint, lineDirection);
        var distance = intersection.distance(planePoint);
        var hit = global.dartboard.getMultiple(intersection);
        var score = 0;
        
        if (hit != "miss") {
            score = global.dartboard.getScore(intersection);
            print(hit + " for " + score);
        }
        else {
            print("miss");
        }
        
    }
    else {
        print("not facing target: " + facingDot);
    }
        
});

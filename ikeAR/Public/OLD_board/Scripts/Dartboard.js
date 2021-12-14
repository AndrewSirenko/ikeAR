// -----JS CODE-----
// @input SceneObject centerMarker
// @input SceneObject bullseyeInsideMarker
// @input SceneObject bullseyeOutsideMarker
// @input SceneObject tripleInsideMarker
// @input SceneObject tripleOutsideMarker
// @input SceneObject doubleInsideMarker
// @input SceneObject doubleOutsideMarker

global.dartboard = script;

script.scaler = 100; // based on mesh export

var BULLSEYE_INSIDE = 0;
var BULLSEYE_OUTSIDE = 1;
var TRIPLE_INSIDE = 2;
var TRIPLE_OUTSIDE = 3;
var DOUBLE_INSIDE = 4;
var DOUBLE_OUTSIDE = 5;

script.scoresByAngle = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

var center = script.centerMarker.getTransform().getLocalPosition();
var innerBullseye = script.bullseyeInsideMarker.getTransform().getLocalPosition();
var outerBullseye = script.bullseyeOutsideMarker.getTransform().getLocalPosition();
var innerTriple = script.tripleInsideMarker.getTransform().getLocalPosition();
var outerTriple = script.tripleOutsideMarker.getTransform().getLocalPosition();
var innerDouble = script.doubleInsideMarker.getTransform().getLocalPosition();
var outerDouble = script.doubleOutsideMarker.getTransform().getLocalPosition();

var ranges = [];
ranges[BULLSEYE_INSIDE] = center.distance(innerBullseye) * script.scaler;
ranges[BULLSEYE_OUTSIDE] = center.distance(outerBullseye) * script.scaler;
ranges[TRIPLE_INSIDE] = center.distance(innerTriple) * script.scaler;
ranges[TRIPLE_OUTSIDE] = center.distance(outerTriple) * script.scaler;
ranges[DOUBLE_INSIDE] = center.distance(innerDouble) * script.scaler;
ranges[DOUBLE_OUTSIDE] = center.distance(outerDouble) * script.scaler;

script.printRanges = function () {
    print("Bullseye Inside: " + ranges[BULLSEYE_INSIDE].toFixed(2));
    print("Bullseye Outside: " + ranges[BULLSEYE_OUTSIDE].toFixed(2));
    print("Triple Inside: " + ranges[TRIPLE_INSIDE].toFixed(2));
    print("Triple Outside: " + ranges[TRIPLE_OUTSIDE].toFixed(2));
    print("Double Inside: " + ranges[DOUBLE_INSIDE].toFixed(2));
    print("Double Outside: " + ranges[DOUBLE_OUTSIDE].toFixed(2));
}

script.getMultiple = function (point) {
    var distance = script.getTransform().getWorldPosition().distance(point);
    if (distance <= ranges[BULLSEYE_INSIDE]) return 2;
    if (distance <= ranges[BULLSEYE_OUTSIDE]) return 1;
    if (distance <= ranges[TRIPLE_INSIDE]) return 1;
    if (distance <= ranges[TRIPLE_OUTSIDE]) return 3;
    if (distance <= ranges[DOUBLE_INSIDE]) return 1;
    if (distance <= ranges[DOUBLE_OUTSIDE]) return 2;
    return 0;
}

script.getScore = function (point) {
    var distance = script.getTransform().getWorldPosition().distance(point);
    
    if (distance <= ranges[BULLSEYE_OUTSIDE]) {
        return 25;
    }
    
    var worldCenter = script.centerMarker.getTransform().getWorldPosition();
    var up = script.centerMarker.getTransform().getWorldRotation().multiplyVec3(vec3.up());
    var forward = script.centerMarker.getTransform().getWorldRotation().multiplyVec3(vec3.forward());
    var direction = point.sub(worldCenter).normalize();
    var leftSide = direction.cross(up).dot(forward) < 0; // this returns 0..1 on the right side, -1..0 on the left
    var angle = up.angleTo(direction) * (180/Math.PI);
    if (leftSide) angle = 360 - angle;
    var iterations = 360 / script.scoresByAngle.length;
    angle += (iterations / 2);
    if (angle < 0) angle += 360;
    if (angle > 360) angle -= 360;
    var scoreIndex = Math.floor(angle / iterations);
    return script.scoresByAngle[scoreIndex];
}

/**
 * Determines the point of intersection between a plane defined by a point and a normal vector and a line defined by a point and a direction vector.
 *
 * @param planePoint    A point on the plane.
 * @param planeNormal   The normal vector of the plane.
 * @param linePoint     A point on the line.
 * @param lineDirection The direction vector of the line.
 * @return The point of intersection between the line and the plane, null if the line is parallel to the plane.
 */
//https://stackoverflow.com/questions/5666222/3d-line-plane-intersection

// lineDirection must be normalized
global.linePlaneIntersection = function (planePoint, planeNormal, linePoint, lineDirection) {
    var dot = planeNormal.dot(lineDirection);
    if (dot == 0) {
        return undefined;
    }

    var dot2 = planeNormal.dot(planePoint);
    var dot3 = planeNormal.dot(linePoint);
    var dot4 = planeNormal.dot(lineDirection);

    var t = (dot2 - dot3) / dot4;

    var xs = lineDirection.x * t;
    var ys = lineDirection.y * t;
    var zs = lineDirection.z * t;
    var lineDirectionScale = new vec3(xs, ys, zs);

    var xa = (linePoint.x + lineDirectionScale.x);
    var ya = (linePoint.y + lineDirectionScale.y);
    var za = (linePoint.z + lineDirectionScale.z);

    return new vec3(xa, ya, za);
}

script.targetPosition = script.getTransform().getLocalPosition();
script.startPosition = script.targetPosition.add(script.getTransform().up.uniformScale(50));
script.duration = 1.5;
script.timer = 0;
script.getTransform().setLocalPosition(script.startPosition);

script.process = function () {
    script.timer += getDeltaTime();
    var t = script.timer / script.duration;
    if (t >= 1) t = 1;
    script.getTransform().setLocalPosition(vec3.lerp(script.startPosition, script.targetPosition, t));
}

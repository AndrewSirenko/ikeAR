// -----JS CODE-----
// @input Component.Image barImage
// @input Component.ScriptComponent setPowerScript
// @input vec4 minPowerColor = { 0.5, 0.5, 0.5, 0.5 } { "widget":"color"}
// @input vec4 maxPowerColor = { 1, 1, 1, 1 } { "widget":"color"}

global.powerBar = script;

script.width = script.getTransform().getLocalScale().x;
script.height = script.getTransform().getLocalScale().y;

script.createEvent("UpdateEvent").bind(function() {
    if (script.setPowerScript.isActive === true) {
        script.barImage.getSceneObject().enabled = true;
        
        // This should be a value of 0..1
        var power = script.setPowerScript.power;
        
        script.getTransform().setLocalScale(new vec3(script.width, script.height * power, 1));
        var color = vec4.lerp(script.minPowerColor, script.maxPowerColor, power);
        script.barImage.mainPass.baseColor = color;
    }
    else {
        script.barImage.getSceneObject().enabled = false;
    }
});

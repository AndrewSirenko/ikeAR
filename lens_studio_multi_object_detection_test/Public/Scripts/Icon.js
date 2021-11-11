// Icon.js
// Version: 0.0.1
// Event: OnAwake
// Description: Controls icon behavior


var transform = null;
var material = null;
var counter = null;
var counterText = null;
var circle = null;


function init() {
    transform = script.getSceneObject().getComponent("Component.ScreenTransform");
    material = script.getSceneObject().getComponent("Component.Image");
    circle = script.getSceneObject().getChild(0);
    counter = script.getSceneObject().getChild(1);
    counterText = counter.getComponent("Component.Text");
}


script.api.pop = function(state) {
    var x = transform.anchors.getCenter().x;
    var y = state ? -0.9 : -1;
    transform.anchors.setCenter(new vec2(x, y));

    circle.enabled = state;
    counter.enabled = state;
};


script.api.setDisabled = function(state) {
    material.mainPass.blocked = state;
};


script.api.setCounter = function(amount) {
    counterText.text = amount;
};


script.api.reset = function() {
    script.api.pop(false);
    script.api.setDisabled(true);
    script.api.setCounter("");
};


script.api.setPositionX = function(posX) {
    var y = transform.anchors.getCenter().y;
    transform.anchors.setCenter(new vec2(posX, y));
};


init();
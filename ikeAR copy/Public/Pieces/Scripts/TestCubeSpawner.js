// -----JS CODE-----
// @input Asset.ObjectPrefab cubePrefab

script.boxes = [];

script.createEvent("TapEvent").bind(function () {
    var box = script.cubePrefab.instantiate(script.getSceneObject());
    script.boxes.push(box.getComponent("Component.ScriptComponent"));
});

script.createEvent("UpdateEvent").bind(function () {
    // for (var i = 0; i < script.boxes.length; i++) {
    //     script.boxes[i].process();
    // }    
});

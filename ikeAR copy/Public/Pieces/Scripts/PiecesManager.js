// -----JS CODE-----
// @input SceneObject cameraObject
// @input SceneObject buildLocationObject
// @input Asset.ObjectPrefab seatPrefab
// @input Asset.ObjectPrefab legPrefab
// @input Asset.ObjectPrefab leg1Prefab
// @input Asset.ObjectPrefab leg2Prefab
// @input Component.ScriptComponent waitToAddPiece
// @input bool activateSelf

script.stoolObjects = {}
var counter = 0

script.activate = function () {
    script.touchStartEvent = script.createEvent("TapEvent");
    script.touchStartEvent.bind(script.stateMachineStool);
    global.hud.showInstructions("Tap to see the first (base) piece.\n Swipe down with 2 fingers to exit anytime.");
}

script.createEvent("OnStartEvent").bind(function () {
    if (script.activateSelf === true) {
        script.activate();
    }    
});

//----
script.stoolStep0 = function () {
    // leg2 object only added at the end of the state machine    
    if ("leg2" in script.stoolObjects) {
        var leg2Object = script.stoolObjects["leg2"];
        leg2Object.enabled = false;
    }    
    global.hud.showInstructions("Find the base piece. \nTap to see the next step");
    
    // Instantiate seat
    print("stoolStep0 - init seat");    
    var seatObject = script.seatPrefab.instantiate(script.getSceneObject());
    seatObject.enabled = true;
    script.stoolObjects["seat"] = seatObject;
    
    counter = 1;
}

script.stoolStep1 = function () {
    var seatObject = script.stoolObjects["seat"];
    seatObject.enabled = false;
    global.hud.showInstructions("Insert the leg into 1st slot. \nTap to see the next step");
    
    // Instantiate leg1 anim
    print("stoolStep1 - insert leg1");    
    var leg1Object = script.leg1Prefab.instantiate(script.getSceneObject());
    leg1Object.enabled = true;
    script.stoolObjects["leg1"] = leg1Object;
    
    counter = 2;
}

script.stoolStep2 = function () {
    var leg1Object = script.stoolObjects["leg1"];
    leg1Object.enabled = false;
    global.hud.showInstructions("Insert another leg into 2nd slot. \nTap to repeat instructions.");
    
    // Instantiate leg2 anim
    print("stoolStep2 - init leg2");
    var leg2Object = script.leg2Prefab.instantiate(script.getSceneObject());
    leg2Object.enabled = true;
    script.stoolObjects["leg2"] = leg2Object;
    
    counter = 0;
}


script.animOrder = {
    0: script.stoolStep0,
    1: script.stoolStep1,
    2: script.stoolStep2
};


script.stateMachineStool = function () {
    var currFunc = script.animOrder[counter];
    currFunc();
}

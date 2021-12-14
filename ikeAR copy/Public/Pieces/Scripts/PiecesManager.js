// -----JS CODE-----
// @input SceneObject cameraObject
// @input SceneObject buildLocationObject
// @input Asset.ObjectPrefab seatPrefab
// @input Asset.ObjectPrefab legPrefab
// @input Asset.ObjectPrefab leg1Prefab
// @input Asset.ObjectPrefab leg2Prefab
// @input Component.ScriptComponent waitToAddPiece
// @input bool activateSelf

script.pieceObjects = [];
script.ObjectOrder = ['seat', 'leg', 'leg'];
buildLocationTransform = global.planeTracker.position
var counter = 0
var maxStates = 3

script.activate = function () {
    script.touchStartEvent = script.createEvent("TapEvent");
    script.touchStartEvent.bind(script.stateMachineStool);
    global.hud.showInstructions("Swipe forward to place next piece");
    counter = 0;
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
    
    // Instantiate seat
    print("stoolStep0 - init seat");    
    var seatObject = script.seatPrefab.instantiate(script.getSceneObject());
    seatObject.enabled = true;
    script.stoolObjects["seat"] = seatObject;
}

script.stoolStep1 = function () {
    var seatObject = script.stoolObjects["seat"];
    seatObject.enabled = false;
    
    // Instantiate leg1 anim
    print("stoolStep1 - insert leg1");    
    var leg1Object = script.leg1Prefab.instantiate(script.getSceneObject());
    leg1Object.enabled = true;
    script.stoolObjects["leg1"] = leg1Object;
}

script.stoolStep2 = function () {
    var leg1Object = script.stoolObjects["leg1"];
    leg1Object.enabled = false;    
    
    // Instantiate leg2 anim
    print("stoolStep2 - init leg2");
    var leg2Object = script.leg2Prefab.instantiate(script.getSceneObject());
    leg2Object.enabled = true;
    script.stoolObjects["leg2"] = leg2Object;
}

script.stoolObjects = {}
script.animOrder = {
    0: script.stoolStep0,
    1: script.stoolStep1,
    2: script.stoolStep2
};


script.stateMachineStool = function () {
    var currFunc = script.animOrder[counter];
    currFunc()
    
    counter += 1
    counter %= maxStates
}





script.placeLeg = function () {
    // Instantiate piece
    var piece = script.legPrefab.instantiate(null);
    script.pieceObjects.push(piece);

    // Random shift
    var shift = new vec3(10 * Math.random(), 10 * Math.random(), 10 * Math.random());
    
    // Set pose
    var pieceTransform = buildLocationTransform.add(shift)
    print(pieceTransform);
    piece.getTransform().setWorldPosition(pieceTransform);

    // // Set speed
    // var pieceScript = piece.getComponent("Component.ScriptComponent");
    
    //pieceScript.throw(forward, speed);
    // pieceScript.place(x, y);   
    
    // Instant seat
    print("init seat");    
    var seatObject = script.seatPrefab.instantiate(script.getSceneObject());
    seatObject.enabled = true
    script.pieceObjects.push(piece);   
    
}



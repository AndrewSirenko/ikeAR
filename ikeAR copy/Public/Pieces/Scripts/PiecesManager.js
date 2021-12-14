// -----JS CODE-----
// @input SceneObject cameraObject
// @input SceneObject buildLocationObject
// @input Asset.ObjectPrefab seatPrefab
// @input Asset.ObjectPrefab legPrefab
// @input Asset.ObjectPrefab leg2Prefab
// @input Component.ScriptComponent waitToAddPiece
// @input bool activateSelf

script.pieceObjects = [];

script.ObjectOrder = ['seat', 'leg', 'leg'];

buildLocationTransform = global.planeTracker.position


script.activate = function () {
    script.touchStartEvent = script.createEvent("TapEvent");
    script.touchStartEvent.bind(script.placeLeg);
    global.hud.showInstructions("Swipe forward to place next piece");
}


script.placeLeg = function () {
    // Instantiate piece
    var piece = script.legPrefab.instantiate(null);
    script.pieceObjects.push(piece);

    // Random shift
    var shift = new vec3(10 * Math.random(), 10 * Math.random(), 10 * Math.random());
    
    // Set pose
    buildLocationTransform = script.buildLocationContainer.position
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

script.createEvent("OnStartEvent").bind(function () {
    if (script.activateSelf === true) {
        script.activate();
    }    
});

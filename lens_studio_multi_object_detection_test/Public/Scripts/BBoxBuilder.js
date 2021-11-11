// BBoxBuilder.js
// Version: 0.0.1
// Event: OnAwake
// Description: Makes photo frames from given set of bounding boxes.

//@input SceneObject frameRegion
//@input SceneObject source
//@input float frameRotationLimit
//@input float sceneObjectDepth
//@input bool cup
//@input Asset.Material cupColorFilter
//@input SceneObject cupSceneObject
//@input bool car
//@input Asset.Material carColorFilter
//@input SceneObject carSceneObject
//@input bool cat
//@input Asset.Material catColorFilter
//@input SceneObject catSceneObject
//@input bool tv
//@input Asset.Material tvColorFilter
//@input SceneObject tvSceneObject
//@input bool dog
//@input Asset.Material dogColorFilter
//@input SceneObject dogSceneObject
//@input bool pottedPlant
//@input Asset.Material plantColorFilter
//@input SceneObject plantSceneObject
//@input bool bottle
//@input Asset.Material bottleColorFilter
//@input SceneObject bottleSceneObject
//@ui {"widget":"separator"}
//@input vec2 anchorPosition
//@ui {"widget":"separator"}
//@input bool advanced
//@input Asset.Texture[] cropTexture {"showIf": "advanced"}
//@input Component.Camera camera {"showIf": "advanced"}
//@input bool useCrossFrameAdjustment {"showIf": "advanced"}
//@input float smallAreaThreshold {"showIf": "advanced"}
//@input Component.ScriptComponent mlController {"showIf": "advanced"}
//@input Component.ScriptComponent screenRect {"showIf": "advanced"}
//@input Component.ScriptComponent nmsIou {"showIf": "advanced"}


var pins = [];
script.api.pins = pins;


var detectableClasses = [];
var pinAge = 3;
var maxDetections = 10;

init();


function init() {
    detectableClasses.push({
        enabled: script.cat,
        colorFilter: script.catColorFilter,
        model: script.catSceneObject,
        index: 3,
        label: "Cat",
    });

    detectableClasses.push({
        enabled: script.dog,
        colorFilter: script.dogColorFilter,
        model: script.dogSceneObject,
        index: 5,
        label: "Dog",
    });

    detectableClasses.push({
        enabled: script.pottedPlant,
        colorFilter: script.plantColorFilter,
        model: script.plantSceneObject,
        index: 6,
        label: "Potted Plant",
    });

    detectableClasses.push({
        enabled: script.cup,
        colorFilter: script.cupColorFilter,
        model: script.cupSceneObject,
        index: 1,
        label: "Cup",
    });

    detectableClasses.push({
        enabled: script.tv,
        colorFilter: script.tvColorFilter,
        model: script.tvSceneObject,
        index: 4,
        label: "TV",
    });

    detectableClasses.push({
        enabled: script.bottle,
        colorFilter: script.bottleColorFilter,
        model: script.bottleSceneObject,
        index: 7,
        label: "Bottle",
    });

    detectableClasses.push({
        enabled: script.car,
        colorFilter: script.carColorFilter,
        model: script.carSceneObject,
        index: 2,
        label: "Car",
    });

    script.api.detectableClasses = detectableClasses;
    if (script.mlController && script.mlController.api.addCallback) {
        script.mlController.api.addCallback(drawBoxes);
    }
}


function drawBoxes(boxPrints) {
    removeModels();
    makePins(boxPrints);
    script.api.pins = pins;

    for (var k = 0; k < pins.length; k++) {
        pins[k].visible = false;

        if (script.api.disabledLabels.indexOf(pins[k].clsLabel) != -1) {
            continue;
        }

        if (script.useCrossFrameAdjustment && (!pins[k].captured || pins[k].image || pins[k].lost > 0)) {
            continue;
        }

        var pinBox = getPinAverage(pins[k].boxes);

        // Place model
        if (pins[k].model) {
            var model = script.getSceneObject().copyWholeHierarchy(pins[k].model);
            model.enabled = true;
            var modelPos = script.camera.screenSpaceToWorldSpace(new vec2(pinBox.x, pinBox.y), script.sceneObjectDepth);
            model.getTransform().setWorldPosition(modelPos);
            continue;
        }

        // Place box
        var rect = new script.screenRect.api.ScreenRect(script.frameRegion, script.source);
        rect.build();
        rect.resize(pinBox.w, pinBox.h);
        rect.setCenter(pinBox.x, 1 - pinBox.y);
        rect.setRotation(pins[k].rotation);
        rect.setText(pins[k].clsLabel);

        var cropRect = Rect.create(-1, 1, -1, 1);
        cropRect.setCenter(new vec2(pinBox.x * 2 - 1, 1 - pinBox.y * 2));
        cropRect.setSize(new vec2(pinBox.w * 2, pinBox.h * 2));

        rect.setMaterial(pins[k].colorFilter);
        script.cropTexture[k].control.cropRect = cropRect;
        rect.setTexture(script.cropTexture[k]);

        pins[k].image = rect;
        pins[k].visible = true;

        rect.setAnchorPosition(script.anchorPosition.x, script.anchorPosition.y);
    }
}


function removeModels() {
    while (script.getSceneObject().getChildrenCount() > 0) {
        script.getSceneObject().getChild(0).destroy();
    }
}


function makePins(boxPrints) {
    // Skip cross frame pins calculation
    if (!script.useCrossFrameAdjustment) {
        pins.forEach(function(x) {
            if (x.image) {
                x.image.destroy();
                x.image = null;
            }
        });

        pins = [];

        boxPrints.forEach(function(x) {
            createPin(x);
        });
        return;
    }

    // Calculate cross frame pins
    for (var i = 0; i < boxPrints.length; i++) {
        var boxAdded = false;

        // Add the box print to the first found box marker if it is close enough
        for (var j = 0; j < pins.length; j++) {
            if (boxPrints[i].class != pins[j].cls || pins[j].boxes.length == 0) {
                continue;
            }

            var boxArea = boxPrints[i].box[2] * boxPrints[i].box[3];
            if (boxArea < script.smallAreaThreshold) {
                continue;
            }

            var IOU = script.nmsIou.api.iou(boxPrints[i].box, pins[j].boxes[pins[j].boxes.length - 1]);
            if (IOU < 0.8) {
                continue;
            }

            pins[j].boxes.push(boxPrints[i].box);
            boxAdded = true;
            break;
        }

        // Create a new marker if the print was not added to any of the existent
        if (!boxAdded) {
            createPin(boxPrints[i]);
        }
    }

    // Set captured pins
    for (var k = 0; k < pins.length; k++) {
        if (pins[k].boxes.length > pinAge) {
            pins[k].captured = true;
            pins[k].lost = 0;
        } else {
            pins[k].lost += 1;
        }
    }

    // Shift captured pins
    for (var l = 0; l < pins.length; l++) {
        if (pins[l].captured) {
            pins[l].boxes.shift();
        }
    }

    // Destroy images
    for (var m = 0; m < pins.length; m++) {
        if (pins[m].image) {
            pins[m].image.destroy();
            pins[m].image = null;
        }
    }

    pins = pins.filter(function(x) {
        if (x.boxes.length == 0) {
            return false;
        }
        if (x.lost > pinAge) {
            return false;
        }
        return true;
    });
}


function createPin(boxPrint) {
    var classPrint = detectableClasses.filter(function(x) {
        return x.index == boxPrint.class;
    });
    if (classPrint.length == 0 || !classPrint[0].enabled) {
        return;
    }

    if (pins.length >= maxDetections) {
        return;
    }

    var r1 = Math.random();
    var rlimit = script.frameRotationLimit;
    var rot = Math.random() > 0.5 ? -rlimit * r1 : rlimit * r1;
    pins.push({
        cls: boxPrint.class,
        clsLabel: classPrint[0].label,
        boxes: [boxPrint.box],
        rotation: rot,
        image: null,
        captured: false,
        lost: 0,
        visible: false,
        colorFilter: classPrint[0].colorFilter,
        model: classPrint[0].model,
    });
}


function getPinAverage(pinBoxes) {
    if (!script.useCrossFrameAdjustment) {
        return {
            x: pinBoxes[0][0],
            y: pinBoxes[0][1],
            w: pinBoxes[0][2],
            h: pinBoxes[0][3],
        };
    }

    var res = { x: 0, y: 0, w: 0, h: 0 };
    pinBoxes.forEach(function(x) {
        res.x += x[0];
        res.y += x[1];
        res.w += x[2];
        res.h += x[3];
    });
    res.x = res.x / pinAge;
    res.y = res.y / pinAge;
    res.w = res.w / pinAge;
    res.h = res.h / pinAge;
    return res;
}


script.api.disabledLabels = [];
function disableLabel(label) {
    if (script.api.disabledLabels.indexOf(label) != -1) {
        return;
    }
    script.api.disabledLabels.push(label);
}
script.api.disableLabel = disableLabel;


function enableLabel(label) {
    script.api.disabledLabels = script.api.disabledLabels.filter(function(x) {
        return x != label;
    });
}
script.api.enableLabel = enableLabel;

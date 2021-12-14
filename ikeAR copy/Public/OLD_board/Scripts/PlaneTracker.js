// -----JS CODE-----
// PLANE TRACKER
// For Lens Studio on Next Generation Spectacles
// - Gets plane tracking data
// - Determines if a tracked plane is valid or not, based on settings
// - If valid, sets position, normal, and calculated rotation
// Ted Brown / November 16, 2021

// @input SceneObject cameraObject
// @input string floor = "head" {"widget":"combobox", "values":[{"label":"Disabled", "value":"disabled"}, {"label":"Default Rotation", "value":"default"}, {"label":"Head Rotation", "value":"head"}]}
// @input string wall = "vertical" {"widget":"combobox", "values":[{"label":"Disabled", "value":"disabled"}, {"label":"Default Rotation", "value":"default"}, {"label":"Always Vertical", "value":"vertical"}, {"label":"Head Rotation", "value":"head"}]}
// @input string ceiling = "head" {"widget":"combobox", "values":[{"label":"Disabled", "value":"disabled"}, {"label":"Default Rotation", "value":"default"}, {"label":"Head Rotation", "value":"head"}]}

global.planeTracker = script;

script.surfaceType = {
    invalid: "Invalid",
    floor: "Floor",
    wall: "Wall",
    ceiling: "Ceiling"
}

script.rotationType = {
    disabled: "disabled",
    default: "default",
    head: "head",
    vertical: "vertical"
}

script.isActive = false;
script.singlePlaneUpdateEvent;
script.rotation = quat.quatIdentity();
script.position = vec3.zero();
script.normal = vec3.zero();
script.status = "Idle";
script.surface = script.surfaceType.invalid;

script.isValid = function () {
    return script.surface !== script.surfaceType.invalid;
}

script.start = function () {
    if (script.isActive) {
        print("Plane Tracker is already active");
        return;
    }
        
    if (deviceInfoSystem.isSpectacles() === false && deviceInfoSystem.isEditor() === false) {
        script.status = "Plane Tracking requires\nNext Generation Spectacles";
        print(script.status);
        return;
    }

    script.singlePlaneUpdateEvent = script.createEvent("SinglePlaneTrackingUpdatedEvent");
    script.singlePlaneUpdateEvent.bind(script.handleSinglePlaneUpdate);
    script.isActive = true;
}

script.stop = function () {
    if (script.isActive === false) {
        print("Plane Tracker has already been stopped");
        return;
    }
    script.removeEvent(script.singlePlaneUpdateEvent);
    script.isActive = false;
    script.status = "Stopped";
}

script.handleInvalidSurface = function (reason) {
    if (reason === undefined) reason = "Invalid Surface";
    script.status = reason;
    script.surface = script.surfaceType.invalid;
}

script.handleSinglePlaneUpdate = function (eventData) {
    
    // For more information on the plane object see:
    // https://lensstudio.snapchat.com/api/classes/TrackedPlane/
    if (!eventData.plane) {
        script.handleInvalidSurface("No plane found");
        return;
    }
    
    // The normal is temporary until we confirm the plane is valid
    var normal = eventData.plane.transform.multiplyDirection(vec3.forward());
    
    // We will use the default Y axis direction unless otherwise specified
    var yAxis = eventData.plane.transform.multiplyDirection(vec3.up());

    // An orientation of 0 indicates a horizontal plane
    if (eventData.plane.orientation === 0) {

        // Determine if this is a floor or ceiling by getting the dot product of the normal and world up
        var isFloor = normal.dot(vec3.up()) > 0.9;

        // FLOOR
        if (isFloor) {
            if (script.floor === script.rotationType.disabled) {
                script.handleInvalidSurface("Floor Not Allowed");
                return;
            }
            
            script.surface = script.surfaceType.floor;
            
            if (script.floor === script.rotationType.head) {
                // let head tilt / roll have some influence
                yAxis = script.cameraObject.getTransform().back.add(script.cameraObject.getTransform().up).uniformScale(0.5);
            }        
        }
        
        // CEILING
        else {
            if (script.ceiling === script.rotationType.disabled) {
                script.handleInvalidSurface("Ceiling Not Allowed");
                return;
            }
            
            script.surface = script.surfaceType.ceiling;
            
            if (script.ceiling === script.rotationType.head) {
                yAxis = script.cameraObject.getTransform().forward.add(script.cameraObject.getTransform().up).uniformScale(0.5);
            }        
                    
        }
    }
    // WALL: An orientation of 1 indicates a vertical plane
    else if (eventData.plane.orientation === 1) {
        
        if (script.wall === script.rotationType.disabled) {
            script.handleInvalidSurface("Wall Not Allowed");
            return;
        }
        
        script.surface = script.surfaceType.wall;
        
        if (script.wall === script.rotationType.head) {
            yAxis = script.cameraObject.getTransform().up;
        }        
        else if (script.wall === script.rotationType.vertical) {
            yAxis = vec3.up();
        }        
    }

    script.status = script.surface;
    script.position = eventData.plane.transform.multiplyPoint(vec3.one());
    var zAxis = eventData.plane.transform.multiplyDirection(vec3.forward());
    script.rotation = quat.lookAt(zAxis, yAxis);
    script.normal = normal;
}

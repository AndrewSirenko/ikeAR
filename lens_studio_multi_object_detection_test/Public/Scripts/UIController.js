// UIController.js
// Version: 0.0.1
// Event: OnAwake
// Description: Builds and updated carousel of icons.

//@input Component.Script frameBuilder
//@input SceneObject[] icons


var icons = [];
var builderApi = null;


function init() {
    if (!script.frameBuilder) {
        return;
    }

    builderApi = script.frameBuilder.api;
    for (var i = 0; i < builderApi.detectableClasses.length; i++) {
        var iconIndex = builderApi.detectableClasses[i].index - 1;
        var icon = script.icons[iconIndex].getComponent("Component.Script");
        icons.push({
            count: 0,
            cls: builderApi.detectableClasses[i].label,
            enabled: builderApi.detectableClasses[i].enabled,
            icon: icon,
        });
        script.icons[iconIndex].enabled = icons[i].enabled;
    }

    script.createEvent("UpdateEvent").bind(update);
}


function arrangeIcons() {
    var dist = 0.279;
    var counter = 0;
    var length = icons.filter(function(x) {
        return x.enabled; 
    }).length;

    for (var i = 0; i < icons.length; i++) {
        if (icons[i].enabled && icons[i].icon.api.setPositionX) {
            icons[i].icon.api.setPositionX(dist * counter - dist * length * 0.5 + dist * 0.5);
            counter += 1;
        }
    }
}


function update() {
    resetIcons();

    for (var i = 0; i < builderApi.pins.length; i++) {
        if (!builderApi.pins[i].visible) {
            continue;
        }

        var cls = builderApi.pins[i].clsLabel;
        var classIcons = icons.filter(function(x) {
            return x.cls == cls;
        });
        classIcons.forEach(function(x) {
            x.count += 1;
            if (x.count == 1) {
                x.icon.api.pop(true);
            }
            x.icon.api.setCounter("" + x.count);
        });
    }

    icons.forEach(function(x) {
        if (x.icon.api.setDisabled) {
            x.icon.api.setDisabled(builderApi.disabledLabels.indexOf(x.cls) != -1);
        }
    });
}


function resetIcons() {
    icons.forEach(function(x) {
        x.count = 0;
        if (x.icon.api.reset) {
            x.icon.api.reset();
        }
    });

    arrangeIcons();
}


init();
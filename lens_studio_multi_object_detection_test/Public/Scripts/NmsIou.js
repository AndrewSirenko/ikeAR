// NmsIou.js
// Version: 0.0.1
// Event: OnAwake
// Description: Implements non-maximum suppression and intersection over union algorithms.


function nms(boxes, scores, scoreThresh, iouThresh) {
    var result = [];
    var candidates = [];

    for (var i = 0; i < boxes.length; i++) {
        if (scores[i].score > scoreThresh) {
            candidates.push({
                box: boxes[i],
                score: scores[i].score,
                class: scores[i].cls
            });
        }
    }

    candidates.sort(compareByScoreReversed);

    while (candidates.length > 0) {
        var currentBox = candidates.shift();
        result.push(currentBox);
        candidates.forEach(function(item) {
            if (currentBox.class == item.class) {
                var IOU = iou(currentBox.box, item.box);
                if (IOU >= iouThresh) {
                    candidates = candidates.filter(function(x) {
                        return x != item;
                    });
                }
            }
        });

    }

    return result;
}


function iou(box1, box2) {
    var x1 = box1[0];
    var y1 = box1[1];
    var x2 = box1[0] + box1[2];
    var y2 = box1[1] + box1[3];

    var x3 = box2[0];
    var y3 = box2[1];
    var x4 = box2[0] + box2[2];
    var y4 = box2[1] + box2[3];

    var xi1 = Math.max(x1, x3);
    var yi1 = Math.max(y1, y3);
    var xi2 = Math.max(x2, x4);
    var yi2 = Math.max(y2, y4);

    var iarea = Math.abs(xi2 - xi1) * Math.abs(yi2 - yi1);
    var b1area = box1[2] * box1[3];
    var b2area = box2[2] * box2[3];
    var uarea = b1area + b2area - iarea;

    return iarea / uarea;
}


function compareByScoreReversed(a, b) {
    return b.score - a.score;
}


script.api.nms = nms;
script.api.iou = iou;
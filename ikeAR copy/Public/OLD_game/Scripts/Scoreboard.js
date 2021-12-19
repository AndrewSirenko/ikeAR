// -----JS CODE-----
// @input Component.Text displayText

global.scoreboard = script;

script.displayText.text = "";

script.handleHit = function (point) {
    var multiple = global.dartboard.getMultiple(point);
    var score = global.dartboard.getScore(point);
    
    var scoreText = "";
    
    if (multiple >= 3) {
        scoreText = "Triple ";
    }
    else if (multiple >= 2) {
        scoreText = "Double ";
    }
    else if (multiple >= 1) {
        scoreText = "Single ";
    }
    else {
        scoreText = "Miss";
    }
    
    if (multiple > 0) {
        if (score > 20) {
            scoreText += "Bull";
        }
        else {
            scoreText += score + "";
        }
    }
    
    script.displayText.text = scoreText;
    global.hud.showResult(scoreText);
}
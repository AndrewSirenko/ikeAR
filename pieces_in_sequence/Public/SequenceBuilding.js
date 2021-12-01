// -----JS CODE-----
// input
// @input string curTrigger = ""
global.assemblyStep = 0

function printTime (eventData)
{
    global.assemblyStep += 1
    script.curTrigger = "trig_" + global.assemblyStep
    global.scBehaviorSystem.sendCustomTrigger(script.curTrigger)
    print(script.curTrigger);
    
}
// Bind the function printTime to the event UpdateEvent
var event = script.createEvent("TouchStartEvent");
event.bind( printTime );


function displayPieces (eventData)
{
    global.assemblyStep += 1
    print(global.assemblyStep);
}
// -----JS CODE-----


function printTime (eventData)
{
    // Print the elapsed Lens time
    print(getTime().toString());
}
// Bind the function printTime to the event UpdateEvent
var event = script.createEvent("TouchStartEvent");
event.bind( printTime );

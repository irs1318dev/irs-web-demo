/*
Flask Application for Scouting Technology Demo
JavaScript Functions for Socket.io and Web Sockets
Stacy Irwin, 10 Jan 2022

This JavaScript module contains functions that use web sockets to
communicate between the server and browser. Many of the functions
are provided by an external JavaScript package called socket.io,
which is loaded in the corresponding HTML file,
tempaltes/socket.html. See https://socket.io/ for more information.

This module is loaded by the demo application's main page, and by
the station pages, which open in other windows when the user
clicks on their corresponding links on the Web Sockets tab.
*/

// Get HTML station selector and message input controls from main demo page.
const stationSelect = document.querySelector("#selectStations");
const msgText = document.querySelector("#messageText");

/**
 * Retrieve the selected stations from the <select> element.
 * 
 * @returns An array of station name strings, e.g., "red-1",
 * "blue-2", etc.
 */
function getSelectedStations() {
    const selectedElements = stationSelect.selectedOptions;
    let selectedStations = [];

    for (let i = 0; i < selectedElements.length; i++) {
        let station = selectedElements[i].value.toLowerCase();
        station = station.replace(" ", "-");
        console.log(`Selected ${station}!!!`);
        selectedStations.push(station);
    }
    return selectedStations;
}

// This array will store all incoming messages.
let socketLog = [];

/**
 * Appends msg string to `<div id="log">` element.
 * 
 * @param {*} msg String
 */
 function updateLog(msg) {
    socketLog.push(Date().toString() + "\n\t" + msg + "\n");
    document.querySelector("#log").innerHTML = socketLog.join("\n");
}

/* ===== Initiate WebSocket Connection ==========
The statment following this comment block, `let socket = io(...);`,
initiates the websocket connection with the server. The `io()` function
works without any parameters. But in this example we are passing a
parameter to `io()`, which socket.io will send to the server along with
the initial connection request.

To pass a value to the Flask server, we have to put the value inside an
object with an `auth` key. Flask will only receive the value
corresponding to the `auth` key. Any other data added to the object
will be ignored.

The value that we send to the Flask server comes from a `<div>` element
with `id="station"`. This element exists on the main page and all of
the station pages, but it is hidden.

When we initially set
up the socket.io connection. We do this by passing a JSON object to the
`io()` function. The JSON object has a key of `auth` and the text of the
hidden <div> element as its value.

The main page and all station pages have a hidden <div> element with
content that indicates which client is sending the message. The id
values are "server", "red-1", "blue-1", "red-2", etc.On the server side,
the value will be passed to the Python handler function as a parameter.*/
let socket = io({
    auth: document.querySelector("#station").innerHTML
});


// Display connection status message.
socket.on('connect', function() {
    updateLog(`Socket.io Connection Established: ${socket.id}`);
});

// Report if there was a connection error.
socket.on('connect_error', () => {
    updateLog("CONNECTION ERROR!!!!")
});


/**
 * Send a chat message via web sockets.
 * 
 * The chat message is a JSON string with two keys.
 * * recipients: array containing station strings, e.g., "red-1",
 *   "blue-2", etc.
 * * message: The text of the message.
 */
function sendChat() {
    const msg = {
        recipients: getSelectedStations(),
        message: msgText.value
    };
    /* This is the function that sends the message to the server.
       To see the server code that handles this message, find the 
       @socketio.on("chat") decorator in templates/demo-app.py. */
    socket.emit("chat", msg);
    // Display the outgoign message on the main page.
    updateLog(JSON.stringify(msg))
}

/* Attach sendChat() to the sendSocketMessage button. Only the main
   page has this button, so we first need to verify the button
   exists. */
if(document.querySelector("#sendSocketMessage")) {
    document.querySelector("#sendSocketMessage").addEventListener(
        "click", sendChat);
    }


// Respond to incoming chat messages.
socket.on("chat", (msg) => {
    updateLog(JSON.stringify(msg));
});
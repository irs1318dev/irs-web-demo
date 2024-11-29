"""Flask Application for Scouting Technology Demo

Stacy Irwin, 10 January 2022. Updated on 29 Nov 2024.

This Python module contains a simple Flask application that
demonstrates the technologies and frameworks that we use in the
IRS Scouting System.

All files that comprise this application are heavily commented. The
comments are intended to explain the technologies so that ar
used in the IRS's scouting system. The examples are helpful, but
they are not a substitute for official documentation. Links to
official documentation are provided in the comments.

## Source Code Files
Carefully read the source code in this Python module and in the related
HTML and JavaScript files. They have lots of comments that explain how
they work. Here are the files that have explanatory comments:
* src/irw_web/templates/index.html
* src/irw_webtemplates/station.html
* src/irw_webtemplates/child-templates/overview.html
* src/irw_webtemplates/child-templates/hcj.html
* src/irw_webtemplates/child-templates/ukit.html
* src/irw_webtemplates/child-templates/spinner.html
* src/irw_webtemplates/child-templates/storage.html
* src/irw_webtemplates/child-templates/socket.html
* src/irw_webstatic/js/spinner.js
* src/irw_webstatic/js/storage.js
* src/irw_webstatic/js/socket.js

This app uses two external packages: UIKit, and socket.io.
Don't bother reading the UIKit or socket.io JavaScript or CSS files.
You do not need to understand the internal workings of these packages.
You only need to understand their public interface. Besides, the files
have been minified, which means they've been compressed to reduce load
time. They are incomprehensible to humans.

## Run the Application
You should also run this demo application. The demo requires several
Python packages to run. Follow the instructions in README.md to install the
dependencies and run the web application.
"""

# ===== Imports =======================================================

# The json package is from the Python Standard Library. It will make
# it easy to work with JSON formatted strings.
import json

# Obviously we can't have a Flask application without importing the
# flask package. See https://flask.palletsprojects.com/en/2.0.x/
import flask

# flask_socketio is an extension to Flask that adds the ability to
# communicate with clients using the websocket protocol. Websockets
# allow the Flask server to push messages and other information to
# browsers without the browsers having to request the information.
# Websockets are an advanced topic and are tricky to understand.
# Feel free to skip over the websocket examples for now.
# See https://flask-socketio.readthedocs.io/en/latest/
import flask_socketio


# ===== Setting Up the Flask Application and Websockets ===============

# We first create a Flask application and set the SECRET_KEY, which
# helps to prevent malicious users from tampering with our application.
app = flask.Flask(__name__)
app.config["SECRET_KEY"] = "1737124"

# We also need to create a `SocketIO` object to use websockets. 
socketio = flask_socketio.SocketIO(app)


# ===== Serving the Main Webpage, index.html ==========================
@app.route("/")
def index():
    """ Get the templates/index.html page and send it to the user.

    Read the comments in templates/index.html to learn more about
    using the UIKit CSS framework to create a navigation bar at the
    top of a webpage, and how to split a large HTML file into
    several smaller files.
    
    This function runs when the user requests a webpage at
    https://localhost:8131 or https://127.0.0.1:8131
    """
    return flask.render_template("index.html")


# region ===== HTML, CSS, and Javascript Tab ==========================
# There are no view functions for this tab. Review
# templates/child-templates/hcj.html to see the client-side code for
# the storage example.
# endregion


# region ===== UIKit CSS Framework Tab =================================
# There are no view functions for this tab. Review
# templates/child-templates/uikit.html to see the client-side code for
# the UIKit example.
# endregion


# region ===== Spinner, Flask, and AJAX Tab ============================
@app.route("/task/<task>/successes/<int:successes>")
def update_measure(task, successes):
    """Reads data from the spinner widget on the Spinner tab.

    This view function responds to URLS like
    https://localhost:8131/task/upperHub/sucesses/3

    In this example, the string "upperHub" is passed into the function
    as the `task` parameter, and the integer 3 is passed as the
    `successes` parameter. the `<int:...` syntax applys a converter
    that converts the value to an integer. If no converter is
    specified, the value will be passed as a string.

    Review templates/child-templates/spinner.html and
    static/js/spinner.js to see the client-side code for this example.

    This view function is intended to respond to an AJAX request, so
    it returns JSON instead of HTML. Nevertheless, you can try it out
    by typing a URL like https://localhost:8131/task/lowerHum/sucesses/5
    into a browser's address bar.
    """
    
    # Normally we would process the data from the client and save it
    # in our sqlite database. But for this demo, we'll just
    # convert it to JSON and send it back to the client.
    return json.dumps({"task": task, "successes": successes})
# endregion


# region ===== Local Browser Storage Tab ======================================
# There are no view functions for the storage tab. Review
# templates/child-templates/storage.html and static/js/storage.js to
# see the client-side code for the storage example.
# endregion


# region ===== Web Sockets Tab ========================================
# Review templates/station.html, templates/child-templates/socket.html,
# and static/js/socket.js to see the client-side code for this example.

# Every websocket connection is a assigned a string of random 
# characters as its socket ID. This dictionary is used to map the
# socket IDs to the browsers that are expected to connect to the
# server for scouting an FRC match.
# 
# Keys like "red-1" or "blue-3" would be reserved for scouters who are
# scouting a single robot during a match. The "server" key would be
# for the webpage used by the scouting technician to manager the
# entire server.
socket_ids = {
    "server": None,
    "red-1": None,
    "red-2": None,
    "red-3": None,
    "blue-1": None,
    "blue-2": None,
    "blue-3": None
}

@app.route("/station/<any(blue, red):alliance>/<int(min=1, max=3):station>/")
def station(alliance, station):
    """Renders a webpage for a given station, e.g., red-1, blue-2, etc.

    This is a standard Flask view function. It does not use websockets.

    Responds to URLs like https://localhost:8131/station/blue/2
    * The route parameter <any(blue, red):alliance> will match either
      "blue" or "red", but nothing else. The view function's `alliance`
      parameter will contain the string "red" or "blue".
    * The route parameter <int(min=1, max=3):station> matches 1, 2, or
      3. The view function's `station` parameter will contain an
      integer ranging from 1 to 3.

    The template file is located at templates/station.html.
    """
    # Passes the alliance and station variables to the template. These
    # values can be accessed inside the template with `{{ alliance }}`
    # and `{{ station }}`` statements.
    return flask.render_template("station.html",
                                  alliance=alliance,
                                  station=station)

@socketio.on("connect")
def connect(station):
    """Runs whenever a client establishes a websocket connection.

    This function checks each new client connection to see if it
    has connected before and verifies that no other clients
    have connected from the same station ("red-1", "blue-1", etc.).
    If a client has already connected with the same station, the
    server will refuse the websocket request by returning False.

    This view function has several print statements. The output
    from the print statements will be displayed in the terminal
    that is used to run this Flask application. The purpose of
    the print statements is to help users understand how the
    web sockets work.

    ### Establishing a WebSocket Connection
    On the browser side, a client establishes a websocket connection
    by calling the `io()` JavaScript function, which is provided by
    the socket.io.min.js module.

    The client side code that establishes the websocket
    connection, `let socket = io(...)`, is contained in the
    /static/js/socket.js file.    

    ### Sending Data to the Server When Establishing Websocket
    The client can send data to this Python Flask application (the
    server) when it starts the websocket connection. The data is
    passed to this function as a parameter. In this example, the
    `station` parameter contains the data passed from the clients.
    Its values are the same as the keys in the `socket_ids`
    dictionary that is defined in this mdoule: "server", "red-1",
    "red-2", "blue-1", etc.

    ### Socket IDs
    Every websocket connection has a unique, randomly generated ID
    value called a socket ID. The socket ID is accessible via the
    `flask.request.sid property`. Here is an example of a socket ID 
    value: PBwa0gqqH_sEoiTSAAAB.
    """
    socket_id = flask.request.sid

    # Check if any client has connected with the given station
    if socket_ids[station] is None:
        # If no prior connections, save socket ID
        socket_ids[station] = socket_id
        print(station, "has connected!!")
    # Check if this is same client that connected earlier
    elif socket_ids[station] != socket_id:
        # If different client is trying to connect, reject connection.
        print("Reconnection attempt on", station, "has been rejected!!!")
        return False
    else:
        print(station, "has re-connected!!")

@socketio.on("chat")
def chat(msg):
    """Receives chat messages and transmits them to intended recipients.
    
    The relevant client-side code is in templates/socket.html and
    static/js/socket.js. The incoming message is sent by the
    `sendChat` function in socket.js.

    The "chat" string is the websocket event name. This function will
    run only for websocket messages that were sent with the "chat"
    event name.

    The `msg` parameter is a JSON string. Here is an example:
    {
        "recipients": ["red-1", "blue-3"],
        "message": "Hey everybody!"
    }

    This function sends a websocket message to the clients specified
    in the "targets" section of the JSON string. The message is
    the value corresponding to the "message" key.
    """
    
    for station in msg["recipients"]:
        # Check that the targeted client has already connected.
        if socket_ids[station] is not None:
            # If the client exists, send the message to that client by
            # assigning the client's socket ID to the `to` parameter
            # of the `emit()` function.
            flask_socketio.emit("chat",
                                msg["message"],
                                to=socket_ids[station])
    print("Received Chat:", json.dumps(msg))
    
@app.route("/reset")
def reset_stations():
    """Erases all client socket ID values and disconnects from clients.

    This view function runs in response to the URL
    https://localhost:8131/reset

    Call this function if you want to open a new station.HTML page that
    connects with the same station as a prior page.
    """
    for station in socket_ids.keys():
        # Disconnect the client. The client can respond to the
        # disconnection event if it registers an `on("disconnect")`
        # event.
        if socket_ids[station]:
            flask_socketio.disconnect(socket_ids[station], "/")
        # Delete the socket ID.
        socket_ids[station] = None

    # Provide some output to users.
    print("RESET ALL STATIONS!!")
    return ("Stations reset.")

@app.after_request
def add_nocache_headers(response):
    """Adds no-cache headers to every outgoing HTTP response."""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

# endregion

# ===== Run the Server ================================================
# We use a different process to start the server when using the
# Flask-SocketIO extension. Running the `web-demo` at the Terminal or
# PowerShell prompt causes the `main()` function below to be executed.
#
# This application requires that the Python eventlet package is
# installed. The eventlet package provides a Flask and socket.io
# compatible webserver that we can use for development and for
# running the scouting system at FRC competitions.
#
# The socketio.run() function will run when the `main()` function is executed.
# We're using three parameters:
# * app:   This is the variable that contains the Flask application
#          object. It was created back at line 63 or thereabouts. This
#          parameter is always required.
# * port:  If omitted, Flask will run on port 5000. I thought it
#          would be more fun to run Flask on port 8131. Then we can
#          run the Bokeh server on port 1318.
# * debug: When in debug mode, the server will restart and reload
#          the Flask application if it detects that the Python app
#          file has been modified. The server also logs status
#          updates to the terminal.
# There are several other parameters for the socketio.run()
# function.
# See https://flask-socketio.readthedocs.io/en/latest/api.html for
# more details.

def main():
    """Run the web server."""
    socketio.run(app, port=8131, debug=True)

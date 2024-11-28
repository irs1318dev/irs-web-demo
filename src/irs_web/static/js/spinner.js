/*
Flask Application for Scouting Technology Demo
JavaScript functions for spinner demo
Stacy Irwin, 10 Jan 2022

A spinner is a user interface component for quickly entering integer
values. It consists of a text input and two buttons. One button
increments the integer by one, and the other decrements the integer.

FYI, interactive user-interface components are often called widgets.
*/

/*
### Anonymous JavaScript Code
One of the things we need to be concerned about when importing several
JavaScript modules into a single web page is name collisions. Name
collisions occur when two different JavaScript modules attempt to use
the same name for two different variables.

One solution to this problem is to give variable names a unique prefix
that is unlikely to be used by other modules.

In this module, we are avoiding name collisions by placing all code
in an anonymous function, and then running that function. An anonymous
function is a function that is defined without a name. All other
variables on this page are inside the function, so they are
invisible to all other JavaScript modules. The first and last lines of
JavaScript code denote the start and end of the anonymous function.
*/

// Start of Anonymous Function
(function () {


/* Called when the spinner's up or down buttons are pressed.

This function is attached to the spinner buttons by the two
`.addEventListener()` methods that follow the function definition. */
function updateSpinner(evt) {
    // Extract the task and direction (up, down) from the button id attributes.
    let task, direction;
    [task, direction] = evt.currentTarget.id.split("-");

    // Get the integer value of the spinner from the text input element.
    const textInput = document.getElementById(task);
    let curVal = parseInt(textInput.value);

    // Update the spinner's value
    if (direction == "up") {
        curVal += 1
    } else if (textInput.value > 0) {
        curVal -= 1
    }
    textInput.value = curVal

    // Send the task and current value to the Flask Server via AJAX.
    sendMeasure(task, curVal);
}

// Link updateSpinner() function to UP button
const upBtn = document.querySelector("#outerGoals-up");
upBtn.addEventListener('click', updateSpinner);
// Link updateSpinner() function to UP button
const downBtn = document.querySelector("#outerGoals-down");
downBtn.addEventListener('click', updateSpinner);

/* Send the spinner's task and current value to the Flask Server.

This function uses a technique called AJAX to communicate with the
Flask server. AJAX stands for Asynchrounous JavaScript and XML. 
* "Asynchronous" means the webpage doesn't freeze and while it waits for
  the result from the server. A callback function will run whenever the
  response from the server is received.
* "JavaScript" means we use JavaScript to code this funcationality.
* "XML" used to be the text format that was used to transfer data
  between the client and server. But XML has largely been replaced
  by JSON. JSON is less verbose than XML. We
  still call it AJAX, even though JSON is used much more frequently
  than XML. I guess AJAJ is just too hard to pronounce.
*/
function sendMeasure(task, successes) {
    /* The fetch() function sends an HTTP request to our server.

    The argument that is passed to the fetch() method is a JavaScript
    template string. It produces a URL path that matches one of the
    paths in the Flask application (see demo-app.py).

    The fetch() function returns a special JavaScript object that's
    called a *Promise*. A Promise is an object that represents a value
    that is not currently known, but will be provided later. We don't
    know how long it will take for the server to send back the data
    we're requesting, so a Promise works well for AJAX requests.

    Promise objects have a `.then()` property that takes a callback
    argument as its first argument. The callback function is
    executed when the Promise returns the requested value.

    The callback function passed to the first `.then()` method returns
    the text of the HTTP response sent by our Flask server. The text
    is passed to the callaback function in the *next* `.then()`
    method.

    The `.catch()` method is similar to `.then()`, except that it
    only runs if there is an error.

    See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    for more info.
    */
    fetch(`task/${task}/successes/${successes}`).then(function(response) {
        // Extracts text from the HTTP response
        return response.text();
    }).then(function(text) {
        // Insert the text into the webpage.
        document.querySelector("#spinnerOutput").innerHTML = text;
    }).catch(function(err) {
        // This function runs if there is an error.
        // It inserts the error data into the webpage.
        document.querySelector("#spinnerOutput").innerHTML = err;
    });
}

/*
End of anonymous function. Note the final two parentheses - they
are used to run the anonymous function.
*/ 
})();
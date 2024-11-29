/*
Flask Application for Scouting Technology Demo
JavaScript Functions Local Browser Storage
Stacy Irwin, 10 Jan 2022. Updated on 29 Nov 2024.

JavaScript allows applications to store information locally within a
web browser. The storage is persistant, meaning a user can close the
browser or restart their computer and the information will still be
retrained.

The globally-available `window.localStorage` object is used to
store data. Data is stored as key-value pairs. To store a value, call
`localStorage.setItem(key, value)` where `value` is the data that will
be stored and `key` is a string that uniquely identifies `value`. You
can think of key as sort of a like a variable name. Both `key` and
`value` must be strings.

To retrieve data from local storage, call `localStorage.getItem(key)`.

Localstorage is one of three types of client-side storage provided by
JavaScript. You can read more about local storage and about other
types of storage at 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
*/

/**
 * Wrapper around Window.localStorage object with integer keys
 * 
 * Local storage uses key values to identify different values. It's
 * similar to objects, which also store data as key value pairs.
 * An example of key-value storage is
 * {red1: frc1318, red2: frc4131, red3: frc2976}
 * 
 * Sometimes we want to store data in a structure that works like an
 * array. We don't want to come up with names for every value. Instead,
 * we want to retrieve data with integer index values.
 * 
 * IndexedDataStore is a custom class that makes local storage work
 * more like an array. It manages localStorage keys by assigning an
 * integer key to every item stored. Keys are incremented by 1 as each
 * new item is added. The `addItem` method returns the key used to
 * store the item.
 * 
 * IndexedDataStore assumes that no other processes are storing items
 * in localStorage.
 */
class IndexedDataStore {
    /**
     * Checks to see if any items are already stored in localStorage
     * and sets the key to 1 plus the maximum key value.
     */
    constructor() {
        this.nextKey = 0
        let len = localStorage.length
        if(len > 0) {
            this.nextKey = parseInt(localStorage.key(len - 1)) + 1
        }
    }

    /**
     * Places an item in local storage with an integer key.
     * 
     * @param {*} item The item to be stored in localStorage.
     * @returns The key value used for localStorage
     */
    addItem(item) {
        let key = this.nextKey.toString()
        localStorage.setItem(key, item)
        this.nextKey++
        return key
    }
    /**
     * Removes an item from local storage. For convenience.
     * 
     * @param {*} key The localStorage key.
     */
    removeItem(key) {
        localStorage.removeItem(key)
    }

    /**
     * Retrieves an item from local storage, but does not remove it.
     * @param {*} key 
     * @returns 
     */
    getItem(key) {
        return localStorage.getItem(key)
    }

    /**
     * Removes all items from localStorage. For convenience.
     */
    clear() {
        localStorage.clear()
    }

    /**
     * Gets all items in local storage.
     * @returns 
     */
    getItems() {
        let items = ["<ul>"]
        for (let i = 0; i < localStorage.length; i++) {
            let item = localStorage.getItem(localStorage.key(i))
            items.push("<li>" + i + ": " + item + "</li>")
        }
        items.push("</ul>")
        return items.join("")
    }

}

// Instantiate our custom class
dataStore = new IndexedDataStore();

/**
 * Create a shortcut function for document.querySelector().
 * 
 * This function is purely for convenience.
 * 
 * @param {*} selector 
 * @returns 
 */
function $(selector) {
    return document.querySelector(selector);
}

// ===== Connect IndexedDataStore methods to web page events. =======
// This section works with the HTML components in 
// templates/child-templates/storage.html

// Store new items when the storeItemButton is pressed.
$("#storeItemButton").addEventListener(
    "click", () => {
        dataStore.addItem($("#storeItemInput").value);
        $("#statusDiv").innerHTML = "Item added to local storage";
});

// Get all items in storage when viewStorage button is pressed.
$("#viewStorage").addEventListener(
    "click", () => {
    $("#itemsInStorage").innerHTML = dataStore.getItems();
});

// Clear all items from storage when clearStorage button is pressed.
$("#clearStorage").addEventListener(
    "click", () => {
    dataStore.clear();
});   


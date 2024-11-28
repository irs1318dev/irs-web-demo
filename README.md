# IRS Web Technology Demonstration

The IRS Web Demo is a small Flask application that uses the following technologies:
* HTML
* CSS
* UIkit CSS Framework
* JavaScript
* AJAX
* Flask
* Local Browser Storage
* Web Sockets and Socket.io
* Flask-SocketIO

All of these technologies are used in the IRS's scouting system. All files
contain detailed comments that explain how the code works.

## Installation
These instructions assume that you haven't already installed Python or other development tools on your system. You can skip steps if the applicable software is already installed.

1. Download and install VS Code.
  * Download the version that's appriate for yoru operating system from https://code.visualstudio.com/download.
  * VS Code is a free code editor.
2. Download and install Git.
  * Download Git from https://git-scm.com/downloads.
  * Accept all default options WITH ONE EXCEPTION. Set your default editor to be VS Code.
3. Use Git to clone this repository to your local machine.
  * Open Mac *Terminal* or Windows *PowerShell*.
  * Navigate to the folder where you keep your Git repositories.
  * Run `git clone 
1. Download and install Python
  * Download and install Python version 3.12.
  * You can download the appropriate version of Python for your operating system from http://python.org.
  * The current version of Python, version 3.13, was just released a few weeks ago. We recommend downloading the earlier version, 3.12, to reduce the risk of bugs.
  * Install Python for your account only (do NOT install for all users).
  * Check the box for adding Python to your PATH variable.
2. Open Max *Terminal* or Windows *Powershell* and install pipx.
  * Run the command `pip install pipx`
  * Pipx is a tool that helps you install other Python tools.
3. Install the PDM environment manager.
  * Run the command `pipx install pdm`
  * PDM makes it easy to manage your Python environments.
4. Use


## Running a Web Server and Serving the Demo App
1. Follow the instructions in `conda-setup.ps1` to set up your Python
environment.
2. Follow the instructions at the end of the `demo-app.py` file to run
the web server.
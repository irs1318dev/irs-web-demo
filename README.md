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
  * Download the version that's appriate for your operating system from https://code.visualstudio.com/download.
  * VS Code is a free code editor.
2. Download and install Git.
  * Download Git from https://git-scm.com/downloads.
  * Accept all default options WITH ONE EXCEPTION. Set your default editor to be VS Code.
3. Use Git to clone this repository to your local machine.
  * Open Mac *Terminal* or Windows *PowerShell*.
  * Navigate to the folder where you keep your Git repositories.
  * Run `git clone 
4. Download and install Python
  * Download and install Python version 3.12.
  * You can download the appropriate version of Python for your operating
    system from http://python.org.
  * The current version of Python, version 3.13, was just released a few weeks ago.
    We recommend downloading the earlier version, 3.12, to reduce the risk of bugs.
  * Install Python for your account only (do NOT install for all users).
  * Check the box for adding Python to your PATH variable.
5. Install pipx.
  * Run the command `pip install pipx` in Mac *Terminal* or Windows *PowerShell*.
  * Pipx is a tool that helps you install other Python tools.
6. Install the PDM environment manager.
  * Run the command `pipx install pdm`
  * We used PDM to structure this package and build the pyproject.toml file.
    PDM makes it easy to manage your Python environments. See
    https://pdm-project.org/latest/ for more info.
7. Install all required dependencies. 
  * Navigate to the root folder of the repository that you cloned in step #3 in Mac *Terminal* or *VS Code*
  * Run `pdm install`


## Running the Demo Web Application
1. Activate that virtual environemnt that PDM just created.
  * From the repository root folder, run `.\.venv\Scripts\activate.ps1 `
    (Windows) or `source .venv\bin\activate` (Mac or Linux).
2. Run the command `web-demo`.
  * Find the URL for the web application in the program output. Paste it into
    a web browser.
  
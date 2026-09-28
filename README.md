# DiscordRPC-AddOn

A lightweight Firefox extension that shares your current website activity directly to your Discord Rich Presence. 

Because web browsers restrict direct communication with local applications for security, this extension uses a small background Python bridge script to securely route your browser activity to Discord.

## Features
* **Zero Configuration:** Install the extension, run the setup script, and it works.
* **Privacy Focused:** Broadcasts the top-level domain name of the site you are browsing (e.g., "Browsing youtube.com"), keeping specific page titles hidden.
* **Cross-Platform:** Includes setup scripts for both Windows and Linux.

## Requirements
* [Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Discord](https://discord.com/) desktop app running in the background.
* [Python 3](https://www.python.org/downloads/) (Make sure "Add to PATH" is checked during installation on Windows).

## Installation

### Step 1: Install the Background Bridge
The background bridge allows Firefox to communicate with Discord. Clone or download this repository, navigate to the folder, and run the installer for your operating system:

* **Windows:** Double-click `install.bat`.
* **Linux:** Open your terminal in the folder and run:
  ```bash
  chmod +x install.sh
  ./install.sh

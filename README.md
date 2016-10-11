# node-istock-balance-scraper
`istock-balance-scraper` is a tool written in Node.js which can scrape and display your iStock account balance. The tool has the following features:

* Displays system notification on startup. E.g. 'Balance: $50'.
* Displays system notification every 30 minutes, but only if the balance was changed. E.g. 'New balance: $60 (+$10)'.
* Can run in the background.
* Can automatically start on boot.

## Installation
### Installation with automatic start on boot, using PM2 on Windows
Execute the following commands (that means: open Command Prompt, enter the command, and press `enter`).

1. Install Node.js 6.x or higher ([Windows](https://nodejs.org/en/download/current/) | [Linux](https://github.com/nodesource/distributions#debinstall) | [OSx](https://nodejs.org/en/download/current/)).
2. `npm install -g pm2 pm2-windows-startup istock-balance-scraper`
3. `pm2-startup install`
4. `istock-balance-scraper config`. Fill in your username and password.
5. `istock-balance-scraper pm2`

### Displaying the notifications in the Windows notification center
By default Windows doesn't display the notifications in the notification center. You can enable this by doing the following steps.

1. Go to 'notifications & actions settings' (`Windows key`, type 'notifications', `enter`)
2. Click on the 'toast' app at the bottom of the screen.
3. Enable the 'show in action center' checkbox.

### Bare installation
Execute the following commands.

1. Install Node.js 6.x or higher ([Windows](https://nodejs.org/en/download/current/) | [Linux](https://github.com/nodesource/distributions#debinstall) | [OSx](https://nodejs.org/en/download/current/)).
2. `npm install -g istock-balance-scraper`
3. `istock-balance-scraper config`. Fill in your username and password.
4. `istock-balance-scraper direct`

## Stopping
### Stopping just the app
Execute `pm2 stop istock-balance-scraper`

### Killing pm2
Execute `pm2 kill`

## Uninstalling everything
1. `pm2-startup uninstall`
2. `npm uninstall -g pm2 pm2-windows-startup istock-balance-scraper`

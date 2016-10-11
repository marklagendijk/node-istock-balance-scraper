# node-istock-balance-scraper
## Installation
### Installation with automatic start on boot, using PM2 on Windows
Execute the following commands.

1. Install Node.js 6.x or higher ([Windows](https://nodejs.org/en/download/current/) | [Linux](https://github.com/nodesource/distributions#debinstall) | [OSx](https://nodejs.org/en/download/current/)).
2. `npm install -g pm2 pm2-windows-startup istock-balance-scraper`
3. `pm2-startup install`
4. `istock-balance-scraper config`. Fill in your username and password.
5. `istock-balance-scraper pm2`

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

const notifier = require('node-notifier');
const pathUtils = require('path');

const title = 'iStock';
const icon = pathUtils.resolve(__dirname, '../assets/icon.png');

module.exports = {
    notify
};

function notify(balance, delta) {
    let message = getMessage(balance, delta);
    notifier.notify({ title, message, icon });
}

function getMessage(balance, delta) {
    return delta ?
        `New balance: ${balance} (${delta}).` :
        `Balance: ${balance}.`;
}
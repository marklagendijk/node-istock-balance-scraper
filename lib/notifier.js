const notifier = require('node-notifier');
const pathUtils = require('path');

module.exports = {
    notify
};

function notify({ message, title='iStock' }){
    return notifier.notify({
        title,
        message,
        icon: pathUtils.resolve(__dirname, '../assets/icon.png')
    });
}
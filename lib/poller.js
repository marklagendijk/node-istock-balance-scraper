const Promise = require('bluebird');
const currencyUtils = require('./currency-utils');
const iStockApi = require('./istock-api');
const balanceStorage = require('./balance-storage');
const notifier = require('./notifier');
const config = require('./config');

let isFirstExecute = true;

module.exports = {
    start
};

function start() {
    execute();
    setInterval(execute, config.pollingIntervalInMinutes * 60000);
}

function execute() {
    return Promise.resolve()
        .then(() => iStockApi.getBalance())
        .then(balance => notifyIfChanged(balance))
        .catch(error => console.error(error.stack));
}

function notifyIfChanged(currentBalance) {
    let lastBalance = balanceStorage.getBalance();
    if(lastBalance && currentBalance !== lastBalance){
        let delta = currencyUtils.getDelta(lastBalance, currentBalance);
        notifier.notify(currentBalance, delta);
    }
    else if(isFirstExecute){
        notifier.notify(currentBalance);
    }
    balanceStorage.setBalance(currentBalance);
    isFirstExecute = false;
}
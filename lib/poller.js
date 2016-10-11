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
    Promise.resolve()
        .then(() => iStockApi.getBalance())
        .then(balance => notifyIfChanged(balance))
        .catch(error => console.error(error.stack));
}

function notifyIfChanged(balance) {
    let lastBalance = balanceStorage.getBalance();
    if (balance != lastBalance) {
        let delta = currencyUtils.getDelta(balance, lastBalance);
        notifier.notify({
            message: `New balance: ${balance} (${delta}).`
        });
    }
    else if (isFirstExecute) {
        notifier.notify({ message: `Balance: ${balance}.` });
    }
    else{
        console.log(balance);
    }
    balanceStorage.setBalance(balance);
    isFirstExecute = false;
}
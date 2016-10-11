const _ = require('lodash');

module.exports = {
    getDelta,
    parse,
    toCurrency
};

function getDelta(amount, otherAmmount){
    let delta = parse(amount) - parse(otherAmmount);
    delta = delta > 0 ? `+${toCurrency(delta)}` : `-${toCurrency(delta*-1)}`;
    return delta;
}

function parse(amount){
    return _.isNumber(amount) ? amount : parseFloat(amount.substr(1));
}

function toCurrency(amount){
    const currencySymbol = '$';
    return `${currencySymbol}${_.round(amount, 2)}`
}


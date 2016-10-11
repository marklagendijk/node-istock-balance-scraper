const fs = require('fs');
const pathUtils = require('path');

const balanceDataPath = pathUtils.resolve(__dirname, '../data/balance.json');

module.exports = {
    hasBalance,
    getBalance,
    setBalance
};

function hasBalance(){
    return !!getBalance();
}

function getBalance(){
    try{
        let json = fs.readFileSync(balanceDataPath);
        let data = JSON.parse(json);
        return data.balance
    }
    catch(e){
        return null;
    }
}

function setBalance(balance){
    fs.writeFileSync(balanceDataPath, JSON.stringify({ balance }))
}
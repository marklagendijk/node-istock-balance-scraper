const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs-extra-promise');
const pathUtils = require('path');
const editor = require('editor');
const untildify = require('untildify');

const applicationConfigFile = pathUtils.join(__dirname, '../config.json');
const userConfigDir = untildify('~/.config/istock-balance-scraper');
const userConfigFile = pathUtils.join(userConfigDir, 'config.json');

module.exports = {
    creatUserConfig,
    init
};


function creatUserConfig(){
    Promise.resolve()
        .then(() => fs.ensureDir(userConfigDir))
        .then(() => fs.copy(applicationConfigFile, userConfigFile))
        .then(() => editor(userConfigFile))
}

function init(){
    try {
        var json = fs.readFileSync(userConfigFile);
        var config = JSON.parse(json);
        _.assign(module.exports, config);
    }
    catch(error){
        console.error(`Unable to load config file at ${userConfigFile}. Run istock-balance-scraper config to initiaze the config.`)
    }
    return module.exports;
}

const Promise = require('bluebird');
const pathUtils = require('path');
const exec = Promise.promisify(require('child_process').exec);

module.exports = {
    startAndSave
};

function startAndSave() {
    let cwd = pathUtils.resolve(__dirname, '..');
    Promise.resolve()
        .then(() => exec(`pm2 start pm2.json`, { cwd }))
        .then(() => exec(`pm2 save`, { cwd }));
}
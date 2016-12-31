#!/usr/bin/env node
const Promise = require('bluebird');
const pm2Starter = require('./lib/pm2-starter');
const iStockApi = require('./lib/istock-api');
const poller = require('./lib/poller');
const config = require('./lib/config');

const argv = require('yargs')
    .usage('Usage: istock-balance-scraper <command>')
    .command('config', 'Initialize the config of the scraper.')
    .command('pm2', 'Start the scraper in PM2.')
    .command('direct', 'Start the scraper directly.')
    .demand(1)
    .argv
    ._;

switch (argv[0]) {
case 'pm2':
    config.init();
    pm2Starter.startAndSave();
    break;

case 'direct':
    config.init();
    Promise.resolve()
        .then(() => iStockApi.login(config.credentials))
        .then(() => poller.start());
    break;

case 'config':
    config.createUserConfig();
    break;
}
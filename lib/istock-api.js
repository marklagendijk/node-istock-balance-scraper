const Promise = require('bluebird');
const request = require('request-promise');
const cheerio = require('cheerio');
const durableJsonLint = require('durable-json-lint');

const urls = {
    login: 'https://www.istockphoto.com/nl/sign-in',
    userView: 'https://secure.istockphoto.com/nl/user_view.php',
    financialTab: 'https://secure.istockphoto.com/nl/ajax_tabcontroller.php'
};
const tabTokenRegex = /TabControllerAjax\.requestTab\('Info',\s*'FinancialTab',\s*'(.+?)'/;

let jar = request.jar();

module.exports = {
    login,
    getBalance
};

function login({ username, password }) {
    return Promise.resolve()
        .then(() => getAuthenticityToken())
        .then(token => loginRequest({ token, username, password }));
}

function getAuthenticityToken() {
    return Promise.resolve()
        .then(() => request.get(urls.login, { jar }))
        .then(response => cheerio.load(response))
        .then($ => $('input[name="authenticity_token"]').val());
}

function loginRequest({ token, username, password }) {
    return request.post(urls.login, {
        jar,
        followAllRedirects: true,
        form: {
            authenticity_token: token,
            new_session: {
                username,
                password
            }
        }
    });
}

function getBalance() {
    return Promise.resolve()
        .then(() => getFinancialTabToken())
        .then(tabToken => financialTabRequest(tabToken))
        .then(response => parseBalance(response));
}

function getFinancialTabToken() {
    return Promise.resolve()
        .then(() => request.get(urls.userView, {
            jar,
            followAllRedirects: true,
        }))
        .then(response => response.match(tabTokenRegex)[1]);
}

function financialTabRequest(tabToken) {
    return request.post(urls.financialTab, {
        jar,
        form: `ShowTab=${encodeURIComponent(tabToken)}&ajax_action=GetContent`
    });
}

function parseBalance(responseJson){
    responseJson = durableJsonLint(responseJson).json;
    let response = JSON.parse(responseJson);
    let $ = cheerio.load(response.content);
    return $('table.mb5 tr').eq(1).children().eq(1).text().replace(' USD', '');
}
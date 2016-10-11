const Promise = require('bluebird');
const request = require('request-promise');
const cheerio = require('cheerio');

const urls = {
    login: 'https://www.istockphoto.com/nl/sign-in',
    userView: 'https://secure.istockphoto.com/nl/user_view.php'
};

let jar = request.jar();

module.exports = {
    login,
    getBalance
};

function login({ username, password }) {
    return Promise.resolve()
        .then(() => getAuthenticityToken())
        .then(token => postLogin({ token, username, password }));
}

function getAuthenticityToken() {
    return Promise.resolve()
        .then(() => request.get(urls.login, { jar }))
        .then(response => cheerio.load(response))
        .then($ => $('input[name="authenticity_token"]').val());
}

function postLogin({ token, username, password }){
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

function getBalance(){
    return Promise.resolve()
        .then(() => request.get(urls.userView, { jar }))
        .then(response => cheerio.load(response))
        .then($ => $('#toolbarBalance strong').text());
}
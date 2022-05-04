const BASE_API_URL = 'https://xm9z-n55r-l347.n7.xano.io';


const BASE_FACEBOOK_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:slmU_THW';

const LINKEDIN_CODE = '78yjzaj2noifj4';
const BASE_LINKEDIN_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:UpsZVD6L';

const MAIN_URL = 'https://galinka5.github.io/';
let token = '';

function signup(name, email, password) {
    console.log('signup');
    const url = `${BASE_API_URL}/api:OUY0MZ6t/auth/signup`;

    $.post(url,
        {
            name: name,
            email: email,
            password: password,
            company: 'test-company'
        },
        (data, status) => {
            console.log(data, status);
            debug(`OK on signup: ${data.authToken}`);
        },
    )
        .fail((response) => {
            console.log(response);
            debug(`Error on signup: ${response.responseText}`, true);
        })
}

function login(email, password) {
    console.log($);
    return new Promise((resolve, reject) => {
        const url = `${BASE_API_URL}/api:OUY0MZ6t/auth/login`;
        $.ajax({
            type: "POST",
            url: url,
            data: {
                email: email,
                password: password,
            },
            success: (data) => {
                token = data.authToken;
                resolve(data)
            },
            error: err => reject(err)
        }
        )
    })
}

function getInfo() {
    console.log('getInfo');
    const url = `${BASE_API_URL}/api:OUY0MZ6t/auth/me`;
    if (token) {
        $.ajax
            ({
                type: "GET",
                url: url,
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + token
                },
                success: function (data) {
                    console.log(data);
                    debug(`OK on getInfo: Hello, ${data.name}`);
                }
            })
            .fail((response) => {
                console.log(response);
                debug(`Error on getInfo: ${response.responseText}`, true);
            })
    }
}

function linkedinInit() {
    console.log('linkedinInit');
    const url = `${BASE_LINKEDIN_API_URL}/oauth/linkedin/init?redirect_uri=${MAIN_URL}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on linkedinInit: ${data}`);
                window.location.href = data;
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on linkedinInit: ${response.responseText}`, true);
        })
}

function linkedinContinue() {
    console.log('linkedinSignup');
    const url = `${BASE_LINKEDIN_API_URL}/oauth/linkedin/continue?code=${LINKEDIN_CODE}&redirect_uri=${MAIN_URL}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on linkedinSignup: ${data}`);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on linkedinSignup: ${response.responseText}`, true);
        })
}

function facebookInit() {
    console.log('facebook init');
    const url = `${BASE_FACEBOOK_API_URL}/oauth/facebook/init?redirect_uri=${MAIN_URL}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on facebook init: ${data}`);
                window.location.href = data;
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on facebook init: ${response.responseText}`, true);
        })
}

function facebookContinue(code) {
    console.log('facebook continue');
    window.location.href.replace(window.location.search, '');
    const url = `${BASE_FACEBOOK_API_URL}/oauth/facebook/continue?redirect_uri=${MAIN_URL}&code=${code}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                token = data.token;
                window.location.href.replace(window.location.search, '');
                debug(`OK on facebook continue: Hello ${data.name} with email ${data.email.email} and id ${data.email.id}`);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on facebook init: ${response.responseText}`, true);
        })
}

function debug(message, error = false) {
    $('#debug').append(`<span ${error ? 'class="error-msg"' : ''}> ${message}</span></br>`);
}
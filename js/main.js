const BASE_API_URL = 'https://xm9z-n55r-l347.n7.xano.io';


const BASE_FACEBOOK_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:slmU_THW';

const BASE_LINKEDIN_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:UpsZVD6L';


const MAIN_URL = 'https://valuation-dev.unicornequity.io';

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
                saveToken(data.authToken);
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
    if (token()) {
        $.ajax
            ({
                type: "GET",
                url: url,
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + token()
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
    const url = `${BASE_LINKEDIN_API_URL}/oauth/linkedin/init?redirect_uri=${MAIN_URL}/li`;
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

function linkedinContinue(code) {
    console.log('linkedinContinue');
    const url = `${BASE_LINKEDIN_API_URL}/oauth/linkedin/continue?code=${code}&redirect_uri=${MAIN_URL}/li`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                saveToSharedObject(data.token, data.email.email, data.email.id, data.name);
                window.location.href = MAIN_URL;
                debug(`OK on linkedin continue: Hello ${data.name} with email ${data.email.email} and id ${data.email.id}`);

            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on linkedinContinue: ${response.responseText}`, true);
        })
}

function facebookInit() {
    console.log('facebook init');
    const url = `${BASE_FACEBOOK_API_URL}/oauth/facebook/init?redirect_uri=${MAIN_URL}/fb/`;
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
    console.log('facebookContinue', code);
    const url = `${BASE_FACEBOOK_API_URL}/oauth/facebook/continue?redirect_uri=${MAIN_URL}/fb/&code=${code}`;
    console.log('call', url);
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                saveToSharedObject(data.token, data.email.email, data.email.id, data.name);
                window.location.href = MAIN_URL;
                debug(`OK on facebook continue: Hello ${data.name} with email ${data.email.email} and id ${data.email.id}`);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on facebook init: ${response.responseText}`, true);
        })
}

function saveToSharedObject(token, email, id, name) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
}

function token() {
    return localStorage.getItem('token') || '';
}

function saveToken(value) {
    localStorage.setItem("token", value);
}

function debug(message, error = false) {
    $('#debug').append(`<span ${error ? 'class="error-msg"' : ''}> ${message}</span></br>`);
}

function showProfile() {
    let str = `email : ${localStorage.getItem("email")} id: ${localStorage.getItem("id")} name:${localStorage.getItem("name")}`
    $('#profileInfo').text(str);
}
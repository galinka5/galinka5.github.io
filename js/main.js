const BASE_API_URL = 'https://xm9z-n55r-l347.n7.xano.io';


const BASE_FACEBOOK_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:slmU_THW';
const BASE_GOOGLE_API_URL = 'https://xm9z-n55r-l347.n7.xano.io/api:U0aE1wpF';
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
    return new Promise((resolve, reject) => {
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
                        resolve(data);
                    }
                })
                .fail((response) => {
                    console.log(response);
                    debug(`Error on getInfo: ${response.responseText}`, true);
                    reject('server error');
                })
        } else reject('no token');
    })
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

function linkedinContinue(code) {
    console.log('linkedinContinue');
    const url = `${BASE_LINKEDIN_API_URL}/oauth/linkedin/continue?code=${code}&redirect_uri=${MAIN_URL}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                saveToSharedObject(data.token, data.email.email, data.email.id, data.name);
                // window.location.href = MAIN_URL;
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
                gotoAdminPage();
                debug(`OK on facebook continue: Hello ${data.name} with email ${data.email.email} and id ${data.email.id}`);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on facebook init: ${response.responseText}`, true);
        })
}

function googleInit() {
    console.log('google init');
    const url = `${BASE_GOOGLE_API_URL}/oauth/google/init?redirect_uri=${MAIN_URL}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on google init: ${data.authUrl}`);
                window.location.href = data.authUrl;
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on google init: ${response.responseText}`, true);
        })
}

function googleContinue(code) {
    console.log('google continue');
    window.location.href.replace(window.location.search, '');
    console.log('googleContinue', code);
    const url = `${BASE_GOOGLE_API_URL}/oauth/google/continue?redirect_uri=${MAIN_URL}&code=${code}`;
    console.log('call', url);
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                saveToSharedObject(data.token, data.email, data.email.id, data.name);
                // window.location.href = MAIN_URL;
                debug(`OK on google continue: Hello ${data.name} with email ${data.email} `);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on google init: ${response.responseText}`, true);
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

function gotoAdminPage() {
    console.log('gotoAdminPage');
    window.location = '/user/';
}

function editUser(id, newName, newEmail, newCompany) {
    console.log(id, newName, newEmail, newCompany);
    return new Promise((resolve, reject) => {
        const url = `${BASE_API_URL}/api:z64ipHaW/user/edit/`;
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                "Authorization": "Bearer " + token()
            },
            data: {
                user_id: id,
                name: newName,
                email: newEmail,
                company: newCompany
            },
            success: (data) => {
                resolve(data)
            },
            error: err => reject(err)
        }
        )
    })

}
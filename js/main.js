const BAS_API_URL = 'https://xm9z-n55r-l347.n7.xano.io';
let token = '';
function signup(name, email, password) {
    console.log('signup');
    const url = `${BAS_API_URL}/api:dBb2rLnG/auth/signup`;

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
        const url = `${BAS_API_URL}/api:dBb2rLnG/auth/login`;
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
    const url = `${BAS_API_URL}/api:dBb2rLnG/auth/me`;
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
                    console.log(data, status);
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
    const url = `${BAS_API_URL}/api:TJxB2zJg/oauth/linkedin/init?redirect_uri=https://newsquantified.com`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data, status);
                debug(`OK on linkedinInit: ${data}`);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on linkedinInit: ${response.responseText}`, true);
        })
}

function linkedinSignup() {
    console.log('linkedinSignup');
    const url = `${BAS_API_URL}/api:TJxB2zJg/oauth/linkedin/signup?code=78yjzaj2noifj4&redirect_uri=https://demo.xano.com/xano-linkedin-oauth/oauth/linkedin`;
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
    const redirect_uri = 'https://galinka5.github.io/pages/profile.html'; //https://demo.xano.com/xano-facebook-oauth/oauth/facebook
    const url = `${BAS_API_URL}/api:nHqGsySr/oauth/facebook/init?redirect_uri=${redirect_uri}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on facebook init: ${data}`);
                window.open(data);
            }
        })
        .fail((response) => {
            console.log(response);
            debug(`Error on facebook init: ${response.responseText}`, true);
        })
}

function facebookContinue(code) {
    console.log('facebook continue');
    const redirect_uri = 'https://galinka5.github.io/'; //https://demo.xano.com/xano-facebook-oauth/oauth/facebook
    const url = `${BAS_API_URL}/api:nHqGsySr/oauth/facebook/continue?redirect_uri=${redirect_uri}&code=${code}`;
    $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                debug(`OK on facebook continue: ${data}`);
                window.open(data, 'popup', 'height=500,width=400,toolbar=no');
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
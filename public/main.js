const UPDATE_TOKEN_URL = 'https://us-central1-winterjs-8fc2c.cloudfunctions.net/api/notifications/tokens';

const firebaseConfig = {
    "apiKey": "AIzaSyDJjrrOX3SVCoSOFNzca7LraZGQYuW0s0U",
    "authDomain": "winterjs-8fc2c.firebaseapp.com",
    "databaseURL": "https://winterjs-8fc2c.firebaseio.com",
    "projectId": "winterjs-8fc2c",
    "storageBucket": "",
    "messagingSenderId": "1051833330520",
    "appId": "1:1051833330520:web:6bf28fc2e4415df5"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging
    .requestPermission()
    .then(function () {
        messaging.getToken()
            .then(function (token) {
                sendTokenToServer(token);
            })
            .catch(function (err) {
                console.log('Unable to retrieve token ', err);
            });
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    });

messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (newToken) {
        sendTokenToServer(newToken);
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
});

function sendTokenToServer(currentToken) {
    console.log('Sending token to server...');
    const settings = {
        "async": false,
        "url": UPDATE_TOKEN_URL,
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify({
            "token": currentToken
        })
    };
    $.ajax(settings).done(function () {
        console.log("Token registered");
    });
}

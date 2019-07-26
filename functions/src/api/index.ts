import cloudNotificationController from "./controllers/cloud_notification_controller";

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const defaultApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://atenea-33daf.firebaseio.com/'
}, 'api');

const app = express();

app.use(cors({origin: true}));

app.use(express.json());

app.use(cloudNotificationController(defaultApp));

export default app;

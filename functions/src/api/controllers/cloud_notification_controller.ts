import {Router} from "express";


function cloudNotificationController(admin_firebase: any) {

    const router = Router();

    router.post('/notifications', (req: any, res: any) => {

        const message = {
            data: req.body,
            topic: 'SPAM'
        };

        admin_firebase.messaging().send(message)
            .then((response: any) => {
                res.status(204).send();
            })
            .catch((error: Error) => {
                res.status(400).json({error: error});
            });
    });

    router.put('/notifications/tokens', (req: any, res: any) => {

        const token: string = req.body.hasOwnProperty('token') ? req.body.token : '';

        if (token !== '') {
            admin_firebase.messaging().subscribeToTopic(token, 'SPAM')
                .then((response: any) => {
                    console.log('Successfully sent message:', response);
                    res.status(204).send();
                })
                .catch((error: Error) => {
                    console.log('Error sending message:', error);
                    res.status(400).json({error: error});
                });
        } else {
            res.status(400).json({error: 'token key not present'});
        }
    });

    return router;
}

export default cloudNotificationController;

import * as express from 'express';
const userRouter = express.Router();
import { UserData, createUser } from '../db/User';


userRouter
    .get('/', (req: express.Request, res: express.Response) => {
        res.end('User list');
    })
    .post('/', (req: express.Request, res: express.Response) => {
        const {
            firstName,
            lastName,
            bio,
            password,
            email
        } = req.body;

        const data: UserData = {
            first_name: firstName,
            last_name: lastName,
            bio,
            password,
            email
        };
        const result = createUser(data)
            .then((result) => {
                res.json({ result: result });
            })
            .catch((err) => {
                console.log(err);

                res.status(500).end(JSON.stringify(err));
            });
    })
    .get('/about', (req: express.Request, res: express.Response) => {

    });

export default userRouter;
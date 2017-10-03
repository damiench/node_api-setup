import * as express from 'express';
const userRouter = express.Router();
import { UserData, createUser, selectAllUsers } from '../db/User';

// TODO: make this route protected and add few more opened routes
// TODO: add jwt middleware for protecting routes
userRouter
    .get('/', (req: express.Request, res: express.Response) => {
        const { offset, limit } = req.body;

        selectAllUsers(limit, offset)
            .then((result) => {

                res.json({ result: result });
            })
            .catch((err) => {
               res.status(500).end(err);
            });
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
                if (result.isError)
                    res.status(400);

                res.json({ result: result });
            })
            .catch((err) => {
                console.log(err);

                res.status(500).end(err);
            });
    })
    .get('/about', (req: express.Request, res: express.Response) => {

    });

export default userRouter;
import * as express from 'express';
const userRouter = express.Router();
import * as multer from 'multer';

import { UserData, createUser, selectAllUsers, getUserById } from '../db/User';
const upload = multer({ dest: '../../uploads' });

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
    .get('/:id', (req, res) => {
        getUserById(req.params.id)
            .then((user) => {
                if (!user)
                    res.status(404).json({ message: 'user not found', isError: true });

                delete user.password;
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    })
    // creates user
    .post('/', (req: express.Request, res: express.Response) => {
        const {
            firstName,
            lastName,
            bio,
            password,
            email
        } = req.body;

        const data: UserData = {
            firstName,
            lastName,
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

    })

export default userRouter;

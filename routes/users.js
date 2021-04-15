import express from 'express';
import { getAllUsers, createUser, getSingleUser, getAllMsgFromUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getSingleUser);
userRouter.get('/:id/messages', getAllMsgFromUser);

export default userRouter;
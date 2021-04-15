import express from 'express';
/* controllers */
import {
    getAllMessages,
    createNewMessage,
    getSingleMessage
}   from '../controllers/messages.js'

const messageRouter = express.Router();

messageRouter.get('/', getAllMessages);
messageRouter.post('/', createNewMessage);
messageRouter.get('/:id', getSingleMessage);

export default messageRouter;
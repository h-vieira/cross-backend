import mongoose from 'mongoose';
import { Message, User } from '../models/Schemas.js';

export const getAllMessages = async (req, res)=> {
    try {
        // If I want to connect two collections in MongoDB (here: add 'author' 
        // from User Schema to the messages)
        // than I have to populate() the messages with the author name
        // https://mongoosejs.com/docs/populate.html
        const messages = await Message.find().populate('author', 'name -_id');
        
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}
        
export const getSingleMessage = async (req, res)=> {
    try {
        const { id } = req.params;
        const singleMessage = await Message.findById(id);   
        if(!singleMessage) return res.status(404).json({ message: `tweet: ${id} not found>`});
        res.json(singleMessage);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

export const createNewMessage = async (req, res)=> {
    try {
        const { text, date, image, author} = req.body;
        const newMessage = await Message.create({
            _id: new mongoose.Types.ObjectId(),
            text, 
            date,
            image,
            author
        });
        // When create new message, I have to update the messages array of the user with certain _id: newMessage.author
        // findOneAndUpdate() https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        // Update Operators: https://docs.mongodb.com/manual/reference/operator/update/
        // 
        const updateUser = await User.findOneAndUpdate({ _id: newMessage.author }, {"$push": { "messages": newMessage._id}}  );
        console.log(updateUser);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}
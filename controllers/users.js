import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from "../models/Schemas.js";

export const getAllUsers = async (req, res) => {
 try {
   const users = await User.find().populate('messages', '_id');
   res.status(200).json(users);
 } catch(err) {
   res.status(500).json({error: err.message})
 }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { _id, name: userName } = await User.create({ 
      _id: new mongoose.Types.ObjectId(),
      name, 
      email, 
      password 
    })
    res.status(201).json(_id, userName)
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    res.json(user);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMsgFromUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('messages');
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    const messages = user.messages;
    res.json(messages);
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
};



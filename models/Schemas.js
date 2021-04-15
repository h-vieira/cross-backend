import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Description how to reference other schema: https://mongoosejs.com/docs/populate.html
const messageSchema = new Schema( {
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true }
},{ versionKey: false });

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
},{ versionKey: false });

export const User = model('User', userSchema);
export const Message = model('Message', messageSchema);
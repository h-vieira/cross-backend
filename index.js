import express from "express"; 
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config.js';
import './db/database.js';

/* routes */
import userRouter from './routes/users.js';
import messageRouter from './routes/messages.js';

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); 
}
app.use(cors({ origin: '*', credentials: true}))

app.use(express.json());

/* middlewares */
app.use('/users', userRouter);
app.use('/messages', messageRouter);
// app.use('/', (req, res) => {res.json('Here later API Description HTML')})

app.listen(port, () => console.log(`Server running on port ${port}`));

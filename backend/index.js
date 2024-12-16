import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'; 
import cors from "cors"

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
  const __dirname = path.resolve();
  
const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.listen(3500, () => {
  console.log('Server listening on port 3500');
  console.log(__dirname)
});

app.use('/api/auth', authRoutes);

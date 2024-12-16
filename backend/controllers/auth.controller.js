import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), 
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

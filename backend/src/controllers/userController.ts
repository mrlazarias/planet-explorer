import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    username,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
}; 
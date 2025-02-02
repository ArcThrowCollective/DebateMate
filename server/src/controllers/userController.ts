import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/env_config';
import { UserStore } from '../models/user';
import { Prisma } from '@prisma/client';
import { NONAME } from 'dns';

const userStore = new UserStore();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      res
        .status(400)
        .json({ message: 'Email, Username and Password required!' });
      return;
    }

    const newUser: Prisma.UsersCreateInput = {
      email,
      username,
      password,
      role: 'MEMBER',
      profile_image: '',
    };

    const createdUser = await userStore.create(newUser);

    const accessToken = jwt.sign(
      {
        id: createdUser.id,
        email: newUser.email,
      },
      config.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ accessToken, user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email or Password wrong!' });
      return;
    }

    const user = await userStore.authenticate(email, password);

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password!' });
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      config.ACCESS_TOKEN_SECRET as string
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,

      maxAge: 15 * 60 * 1000, // 15 min
    });

    //TODO Refreshtoken implementation

    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const authStatus = async (req: Request, res: Response) => {
  // Check the authentication status
  const token = req.cookies.accessToken;
  if (!token) {
    res.json({ isAuthenticated: false, user: null });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    res.json({ isAuthenticated: true, user: decode });
  } catch (error) {
    console.error(error);
    res.json({ isAuthenticated: false, user: null });
  }
};

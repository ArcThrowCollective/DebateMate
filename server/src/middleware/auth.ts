import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.body.query?.includes('GetPublicChannels')) {
      // all channels should be shown on the landingpage without any authentication
      // this makes sure GetPublicChannel request get their response
      return next();
    }

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: 'Authorization header is missing' });
      return;
    }

    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    // use the user properties downstream
    req.user = decoded;

    next();
  } catch (error: any) {
    console.error('Token verification error:', error);

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Token is invalid' });
    }

    return;
  }
};

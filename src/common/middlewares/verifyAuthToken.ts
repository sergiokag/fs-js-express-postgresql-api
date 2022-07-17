import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: `.env` });

export interface RequestWithToken extends Request {
    token: string | jwt.JwtPayload;
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json('Unauthorize user');
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        (req as RequestWithToken).token = decoded;
        next();
    } catch (error) {
        res.status(403).json('Token not valid');
    }
};

export default verifyAuthToken;

import jwt, { type SignOptions } from 'jsonwebtoken';
import { UserPayload } from '../types/jwt';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: UserPayload, expiresIn: string | number = '1d'): string => {
    const options: SignOptions = {  expiresIn: expiresIn as number }
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, secret) as UserPayload;
};
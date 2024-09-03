import jwt from 'jsonwebtoken';

export interface UserPayload {
    userId: string;
    name: string;
    email: string;
    permissions: string[];
}

const SECRET = ""

export function generateToken(payload: UserPayload): string {
    const EXPIRES_ONE_HOUR = 60 * 60;
    return jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_ONE_HOUR,
    })
}
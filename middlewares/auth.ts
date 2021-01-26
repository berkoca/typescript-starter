import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRole } from '../enums';

export function authentication(req: any, res: Response, next: NextFunction) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Missing authorization header.'
        });
    }
    token = token.split(' ')[1];
    verify(token, process.env.TOKEN_SECRET || 'secret', (err: any, decoded: any) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        req.user = decoded.user;
        return next();
    });
}

export function authorization(roles: UserRole[]) {
    return (req: any, res: Response, next: NextFunction) => {
        if (roles.length > 0) {
            for (var i = 0; i < roles.length; i++) {
                if (roles[i] == req.user.role) {
                    return next();
                }
            }
        }
    }
}
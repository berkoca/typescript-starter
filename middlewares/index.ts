import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRole } from '../enums';

export function authentication(req: any, res: Response, next: NextFunction) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'You must login first!'
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
        next();
    });
}

export function authorization(roles: UserRole[]) {
    return (req: any, res: Response, next: NextFunction) => {
        if (roles.length > 0) {
            var access = roles.find(x => x == req.user.role);
            if (access) {
                return next();
            }
        }
        return res.status(403).json({
            success: false,
            message: 'Unauthorized.'
        });
    }
}
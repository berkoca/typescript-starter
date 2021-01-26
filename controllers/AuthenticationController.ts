import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { UserRole } from '../enums';
import { User } from '../models/User';

export class AuthenticationController {
    async login(req: Request, res: Response) {
        try {
            var email = req.body.email;
            var password = req.body.password;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'You must send email and password fields.'
                });
            }
            var user = await User.findOne({ where: { email: email }, attributes: ['id', 'email', 'password', 'role'] });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }
            var isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Wrong password.'
                });
            }
            var token = sign({ user }, process.env.TOKEN_SECRET || 'secret', { expiresIn: 86400 });
            res.json({
                success: true,
                token: token
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async register(req: Request, res: Response) {
        try {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'You must send name, email and password fields.'
                });
            }
            var user = await User.findOne({ where: { email: email } });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'User with this email already exists!'
                });
            }
            user = await User.create({
                name: name,
                email: email,
                password: await hash(password, 8),
                role: UserRole.STANDART
            });
            return res.json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            var users = await User.findAll();
            res.json({
                success: true,
                users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getUser(req: Request, res: Response) {
        try {
            var user_id = req.params.user_id;
            var user = await User.findOne({ where: { id: user_id }});
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
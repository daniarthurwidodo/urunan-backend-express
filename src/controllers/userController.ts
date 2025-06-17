import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  // Get all users
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  // Get user by ID
  static getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  // Create new user
  static createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, phone } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const user = await User.create({ name, email, phone });
      res.status(201).json(user);
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  // Update user
  static updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ name, email, phone });
      res.json(user);
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  // Delete user
  static deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
}
import { Router, Request, Response } from 'express';
import passport from '../config/passport';
import { User } from '../models/User';

const router = Router();

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  try {
    // TODO: Hash password before saving in production!
    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ message: 'User registered', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login endpoint
router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

// Logout endpoint
router.get('/logout', (req: Request, res: Response, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
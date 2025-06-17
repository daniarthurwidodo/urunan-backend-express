import { Router, Request, Response, NextFunction } from 'express';
import passport from '../config/passport';

const router = Router();

router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
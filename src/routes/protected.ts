import passport from 'passport';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/protected',
  passport.authenticate('jwt', {
    session: false
  }),
  (req: Request, res: Response, next) => {
    res.status(200).json({
        result: true,
        message: "Authorized!"
    });
  }
);

export default router;
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import config from '../config/config';
import User, { IUser } from '../models/user';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.SECRET
};

export default new Strategy(options, async (payload, done) => {
  const user = await User.findById(payload.id);

  if (!user) {
    return done(null, false);
  }

  return done(null, user);
});
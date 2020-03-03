import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config';
import User, { IUser } from '../models/user';

class UserController {
  
  // POST > signup
  public signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
          result: false,
          message: "Email and password required."
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        result: false,
        message: "User already exists."
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({
        status: true,
        message: "New user created.",
        data: newUser
    });
  };

  // POST > signin
  public signIn = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        result: false,
        message: "Email and password required."
      });
    }
  
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return res.status(404).json({
        result: false,
        message: "User does not exists."
      });
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res.status(400).json({
          result: false,
          message: "Email or password are incorrect."
      })
    }

    const token = this.createToken(user);

    return res.status(200).json({
      result: true,
      message: "Sign in success.",
      data: {
        user: user,
        token: token
      }
    });
  };

  // Generate token
  private createToken = (user: IUser): string => {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT.SECRET, {
        expiresIn: 86400
    })
  };

}

export default new UserController();
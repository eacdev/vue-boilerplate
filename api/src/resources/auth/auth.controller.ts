import { Request, Response, NextFunction } from 'express';
import User from '../user/user.model';
import logger from '../../logger';

export const me = async (req: Request, res: Response) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send();
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await User.create(req.body);
    req.session.user = user;
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // todo: Make user object more complete by including the servers a user is in
    // That means also updating the session whenever a user joins a new server or other actions.
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      throw new Error('That username and password combination was not found.');
    }

    if (!(await user.validatePassword(req.body.password))) {
      throw new Error('That username and password combination was not found.');
    }

    req.session.user = user;

    logger.info('auth.controller.login', {
      session: req.session.user.dataValues
    });

    res.send(user);
  } catch (e) {
    next(e);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy(e => {
    next(e);
  });
  res.send();
};

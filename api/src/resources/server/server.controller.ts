import { Request, Response, NextFunction } from 'express';
import User from '../user/user.model';
import Server from '../server/server.model';

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: { id: req.session.user.id }
    });
    res.send(await user.$get('servers'));
  } catch (e) {
    next(e);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  // todo: Add permission check? + validation
  try {
    // todo: what if not found?
    await User.findOne({
      where: { id: req.session.user.id }
    });

    let server = await Server.create({
      userId: req.session.user.id,
      name: req.body.name
    });

    server = await Server.findOne({
      where: { id: server.id }
    });

    res.send(server);
  } catch (e) {
    throw new Error(e);
  }
};

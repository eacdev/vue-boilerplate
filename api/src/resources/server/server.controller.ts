import { Request, Response, NextFunction } from 'express';
import User from '../user/user.model';
import Server from '../server/server.model';
import TagUserServer from './taguserserver.model';

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

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    await TagUserServer.create({
      userId: req.session.user.id,
      serverId: server.id
    });

    res.send(server);
  } catch (e) {
    next(e);
  }
};

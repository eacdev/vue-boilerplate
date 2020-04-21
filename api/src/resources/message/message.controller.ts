import { Request, Response, NextFunction } from 'express';
import Server from '../server/server.model';
import Message from './message.model';
import User from '../user/user.model';

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // todo: Add permission check? + validation
  try {
    const serverMessages: Message[] = await Message.findAll({
      order: [['created_at', 'ASC']],
      where: { serverId: req.params.serverId },
      include: [User]
    });

    res.send(serverMessages);
  } catch (e) {
    next(e);
  }
};

// todo: don't pass arguments individually?
export const create = async (req: Request, serverId: number, text: String) => {
  // todo: Add permission check? + validation
  try {
    // todo: what if not found?
    await User.findOne({
      where: { id: req.session.user.id }
    });

    // todo: what if server not found?
    await Server.findOne({
      where: { id: serverId }
    });

    let message = await Message.create({
      userId: req.session.user.id,
      serverId,
      text
    });

    message = await Message.findOne({
      where: { id: message.id },
      include: [User]
    });

    return message;
  } catch (e) {
    throw new Error(e);
  }
};

import { Request, Response, NextFunction } from 'express';
import User from '../user/user.model';

const index = async (
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

export default index;

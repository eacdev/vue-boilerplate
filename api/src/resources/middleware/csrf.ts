import { Request, Response, NextFunction } from 'express';

export default function csrf(req: Request, res: Response, next: NextFunction) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
}

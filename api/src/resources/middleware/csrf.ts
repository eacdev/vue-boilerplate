import { Request, Response, NextFunction } from 'express';

export default function csrf(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
}

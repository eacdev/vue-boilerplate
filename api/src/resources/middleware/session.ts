import session from 'express-session';
import express from 'express';

let sessionMiddleware: express.RequestHandler;

export const createMiddleware = (): void => {
  sessionMiddleware = session({
    secret: process.env.SECRET,
    cookie: {}
  });
};

export const getMiddleware = (): express.RequestHandler => {
  return sessionMiddleware;
};

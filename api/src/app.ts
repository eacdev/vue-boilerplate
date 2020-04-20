import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import cors from 'cors';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import dotEnv from 'dotenv';
import * as session from './resources/middleware/session';
import authRouter from './resources/auth/auth.router';
import serverRouter from './resources/server/server.router';
import csrf from './resources/middleware/csrf';

dotEnv.config();

const app = express();

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for json body parsing
app.use(bodyParser.json({ limit: '5mb' }));

// Enable cors for all origins
// todo: don't hardcode url.
app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true
  })
);

// Enable cookie parser for csurf
app.use(cookieParser());

// Enable CSRF middleware
app.use(csurf({ cookie: true }));

// CSRF middleware that sets the cookie
app.use(csrf);

session.createMiddleware();

app.use((req, res, next) => {
  session.getMiddleware()(req, res, next);
});

app.use('/auth', authRouter);
app.use('/servers', serverRouter);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

export default app;

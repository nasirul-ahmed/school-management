import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import express from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import routes from '../api';
import config from '../config';

export default async ({ app }: { app: express.Application }): Promise<void> => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json({ limit: '50mb' }));
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    let message = err.message;
    if (err.name === 'UnauthorizedError') {
      if (err.inner instanceof TokenExpiredError) {
        message = 'Session expired. Please login again.';
      }
      return res.status(err.status).send({ message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    if (isCelebrateError(err)) {
      let message = '';
      for (const value of err.details.values()) {
        message += value.message + '; ';
      }
      return res.status(400).json({ message });
    }

    res.status(err.status || 500);
    const json: any = {
      message: err.message,
    };
    if (err.data) {
      json.data = err.data;
    }
    res.json(json);
  });
};

import { Router } from 'express';
import apiManagement from './routes/apiManagement';

export default () => {
  const app = Router();
  
  apiManagement(app);

  return app;
};

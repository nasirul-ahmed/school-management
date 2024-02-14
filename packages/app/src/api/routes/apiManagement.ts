import { Joi, Segments, celebrate } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import { baseRoutes, basicRoutes } from "../../config/constants";
import ApiService from "../../services/apiService";

const route = Router();

export default (app: Router) => {
  app.use(baseRoutes.API_Management, route);

  route.post(
    basicRoutes.create,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.silly(
        `Calling ${baseRoutes.API_Management + basicRoutes.create} Endpoint`
      );
      try {
        const apiService = Container.get(ApiService);
        const response = await apiService.addApi(req.body);
        return res.json(response).status(201);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};

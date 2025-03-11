import { screenRoutes } from "./screen.route";
import { Express } from "express";

export const initRoutes = (app: Express) => {
  app.use(screenRoutes);
};

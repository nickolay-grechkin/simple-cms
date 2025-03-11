import express from "express";
import {
  createScreenController,
  getScreenForMobile,
  addSectionToScreenController,
  addItemToSectionController,
} from "../controllers/screen.controller";
import { API_ROUTES } from "../constants";

const router = express.Router();

router.post(API_ROUTES.SCREEN.CREATE, createScreenController);
router.post(API_ROUTES.SCREEN.SECTION.ADD, addSectionToScreenController);
router.post(API_ROUTES.SCREEN.SECTION.ITEM.ADD, addItemToSectionController);

router.get(API_ROUTES.SCREEN.GET, getScreenForMobile);

export { router as screenRoutes };

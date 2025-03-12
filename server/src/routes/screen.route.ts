import express from "express";
import {
  createScreenController,
  addSectionToScreenController,
  addItemToSectionController,
  updateScreenController,
  getAllScreensController,
} from "../controllers/screen.controller";
import { API_ROUTES } from "../constants";

const router = express.Router();

router.post(API_ROUTES.SCREEN.CREATE, createScreenController);
router.post(API_ROUTES.SCREEN.SECTION.CREATE, addSectionToScreenController);
router.post(API_ROUTES.SCREEN.SECTION.ITEM.CREATE, addItemToSectionController);

router.put(API_ROUTES.SCREEN.UPDATE, updateScreenController);

// router.get(API_ROUTES.SCREEN.GET, getScreenForMobile);
router.get(API_ROUTES.SCREEN.GET_ALL, getAllScreensController);
export { router as screenRoutes };

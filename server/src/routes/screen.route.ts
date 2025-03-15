import express from "express";
import { API_ROUTES } from "../constants";
import {
  deleteSectionController,
  upsertSectionController,
  updateScreenController,
  getAllScreensController,
} from "../controllers";

const router = express.Router();

router.get(API_ROUTES.SCREEN.GET_ALL, getAllScreensController);
router.put(API_ROUTES.SCREEN.UPDATE, updateScreenController);

router.post(API_ROUTES.SCREEN.SECTION.CREATE, upsertSectionController);
router.delete(API_ROUTES.SCREEN.SECTION.DELETE, deleteSectionController);

export { router as screenRoutes };

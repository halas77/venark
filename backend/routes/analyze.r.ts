import { Router } from "express";
import { anaylzeController } from "../controllers/analyze.c";

const router = Router();

router.get("/", anaylzeController);

export default router;

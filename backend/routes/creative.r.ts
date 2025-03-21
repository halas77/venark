import { Router } from "express";
import { creativeController } from "../controllers/creative.c";

const router = Router();

router.post("/", creativeController);

export default router;

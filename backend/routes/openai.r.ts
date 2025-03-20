import { Router } from "express";
import { opneaiController } from "../controllers/openai.c";

const router = Router();

router.get("/openai", opneaiController);

export default router;
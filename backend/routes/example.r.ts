import { Router } from "express";
import { exampleController } from "../controllers/example.c";

const router = Router();

router.get("/", exampleController);

export default router;

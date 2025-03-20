import { Router } from "express";
import { exampleController } from "../controllers/example.c";

const router = Router();

router.get("/example", exampleController);

export default router;

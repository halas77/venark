import { Router } from "express";
import { createAgreementController } from "../controllers/agreement.c";

const router = Router();

router.post("/", createAgreementController);

export default router;

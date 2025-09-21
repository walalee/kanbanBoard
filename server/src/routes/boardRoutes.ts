// src/routes/boardRoutes.ts
import { Router } from "express";
import { getBoards, createBoard, renameBoard, deleteBoard } from "../controllers/boardController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware); // ทั้ง router ต้องล็อกอิน

router.get("/", getBoards);
router.post("/", createBoard);
router.put("/:id", renameBoard);
router.delete("/:id", deleteBoard);

export default router;

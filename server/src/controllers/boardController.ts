import { Request, Response } from "express";
import prisma from "../prisma";

export const getBoards = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const boards = await prisma.board.findMany({
      where: { ownerId: userId },
      include: { columns: true },
    });
    return res.json(boards);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const board = await prisma.board.create({
      data: { name, ownerId: userId },
    });

    return res.status(201).json(board);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const renameBoard = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const boardId = Number(req.params.id);
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    // ตรวจว่า user เป็น owner
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board || board.ownerId !== userId) return res.status(403).json({ message: "Forbidden" });

    const updated = await prisma.board.update({ where: { id: boardId }, data: { name } });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const boardId = Number(req.params.id);

    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board || board.ownerId !== userId) return res.status(403).json({ message: "Forbidden" });

    await prisma.board.delete({ where: { id: boardId } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

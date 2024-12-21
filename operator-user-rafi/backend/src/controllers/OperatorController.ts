import { Request, Response } from 'express';
import { localStorage } from '../utils/localStorage';

export const createBorrowItem = async (req: Request, res: Response) => {
  try {
    const newBorrowItem = localStorage.addBorrowItem(req.body);
    res.status(201).json(newBorrowItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating borrow item' });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = localStorage.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const getAllBorrowItems = async (req: Request, res: Response) => {
  try {
    const borrowItems = localStorage.getAllBorrowItems();
    res.json(borrowItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrow items' });
  }
};


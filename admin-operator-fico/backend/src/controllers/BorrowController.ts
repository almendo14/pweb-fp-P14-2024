import { Request, Response } from 'express';
import Item from '../models/BorrowItemModel';

export const getAllBorrowItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};
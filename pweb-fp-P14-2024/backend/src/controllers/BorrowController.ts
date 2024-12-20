import { Request, Response } from 'express';
import Item from '../models/itemModel';

export const getAllBorrowItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};

export const createBorrowItem = async (req: Request, res: Response) => {
    const { nama, jumlah, kondisi, tanggalRegistrasi } = req.body;

    const newItem = new Item({ nama, jumlah, kondisi, tanggalRegistrasi });
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error adding item' });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nama, jumlah, kondisi, tanggalRegistrasi } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { nama, jumlah, kondisi, tanggalRegistrasi }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error updating item' });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Item.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting item' });
    }
};
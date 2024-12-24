import { Request, Response } from 'express';
import Item from '../models/ItemModel';

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};

export const addItem = async (req: Request, res: Response) => {
    const { name, amount, condition, created_at } = req.body;

    const newItem = new Item({ name, amount, condition, created_at });
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error adding item' });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, amount, condition, created_at } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { name, amount, condition, created_at }, { new: true });
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
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting item' });
    }
};


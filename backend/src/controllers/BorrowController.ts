import { Request, Response } from 'express';
import Item from '../models/ItemModel';
import BorrowItem from '../models/BorrowItemModel';

export const getAllBorrowItems = async (req: Request, res: Response) => {
    try {
        const borrowItems = await BorrowItem.find(); 
        res.json(borrowItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowed items', error });
    }
};

export const createBorrowItem = async (req: Request, res: Response): Promise<any> => {
    const { item_name, amount, borrow_date, return_date, borrower_name, officer_name } = req.body;

    try {
        // Find the item in the inventory
        const item = await Item.findOne({ name: item_name });

        if (!item) {
            return res.status(404).json({ message: 'Item does not exist in inventory' });
        }

        // Check if the requested amount is available
        if (item.amount < amount) {
            return res.status(400).json({ message: `Insufficient amount available. Only ${item.amount} left.` });
        }

        // Create the borrow item record
        const newBorrowItem = new BorrowItem({
            item_name,
            amount,
            borrow_date,
            return_date,
            borrower_name,
            officer_name,
        });

        // Save the borrow record and update the item's amount
        await newBorrowItem.save();
        item.amount -= amount;
        await item.save();

        res.status(201).json({ message: 'Borrow record created successfully', borrowItem: newBorrowItem });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
};
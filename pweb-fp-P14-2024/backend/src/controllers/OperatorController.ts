import { Request, Response } from 'express';
import Operator from '../models/UserModel';

export const getAllOperators = async (req: Request, res: Response): Promise<void> => {
    try {
        const operators = await Operator.find();
        res.json(operators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching operators' });
    }
};

export const addOperator = async (req: Request, res: Response): Promise<void> => {
    const { nama, email } = req.body;

    const newOperator = new Operator({ nama, email });
    try {
        await newOperator.save();
        res.status(201).json(newOperator);
    } catch (error) {
        res.status(400).json({ message: 'Error adding operator' });
    }
};

export const updateOperator = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { nama, email } = req.body;

    try {
        const updatedOperator = await Operator.findByIdAndUpdate(id, { nama, email }, { new: true });
        if (!updatedOperator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.json(updatedOperator);
    } catch (error) {
        res.status(400).json({ message: 'Error updating operator' });
    }
};

export const deleteOperator = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const deletedOperator = await Operator.findByIdAndDelete(id);
        if (!deletedOperator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting operator' });
    }
};
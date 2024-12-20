import express from 'express';
import { getAllBorrowItems, createBorrowItem } from '../controllers/BorrowController';

const router = express.Router();

router.get('/', getAllBorrowItems);
router.post('/', createBorrowItem);

export default router;
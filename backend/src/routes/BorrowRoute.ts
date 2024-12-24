import express from 'express';
import {getAllItems} from '../controllers/ItemController';
import {getAllBorrowItems, createBorrowItem} from '../controllers/BorrowController';

const router = express.Router();

router.get('/admin/summary', getAllBorrowItems)
router.post('/book-equipment', createBorrowItem);
router.get('/all-equipment', getAllItems);
router.get('/all-borrow-items', getAllBorrowItems);

export default router;
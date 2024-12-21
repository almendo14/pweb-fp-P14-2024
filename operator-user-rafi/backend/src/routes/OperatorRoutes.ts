import express from 'express';
import { createBorrowItem, getAllItems, getAllBorrowItems } from '../controllers/OperatorController';
import { localStorage } from '../utils/localStorage';

const router = express.Router();

router.post('/book-equipment', createBorrowItem);
router.get('/all-equipment', getAllItems);
router.get('/all-borrow-items', getAllBorrowItems);

// New route to add items (for testing)
router.post('/add-item', (req, res) => {
  const newItem = localStorage.addItem(req.body);
  res.status(201).json(newItem);
});

export default router;


import { Router } from 'express';
import { getAllItems, addItem, updateItem, deleteItem } from '../controllers/ItemController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const router = Router();

router.get('/', authMiddleware, getAllItems);
router.post('/', authMiddleware, addItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

export default router;
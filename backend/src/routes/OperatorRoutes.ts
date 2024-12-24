import { Router } from 'express';
import { getAllOperators, addOperator, updateOperator, deleteOperator } from '../controllers/OperatorController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const router = Router();

router.get('/', authMiddleware, getAllOperators);
router.post('/', authMiddleware, addOperator);
router.patch('/:id', authMiddleware, updateOperator);
router.delete('/:id', authMiddleware, deleteOperator);

export default router;
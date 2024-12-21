import express from 'express';
import { getAllBorrowItems} from '../controllers/BorrowController';

const router = express.Router();

router.get('/', getAllBorrowItems);

export default router;
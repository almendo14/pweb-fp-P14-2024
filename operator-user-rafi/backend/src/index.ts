import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import operatorRoutes from './routes/OperatorRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/operator', operatorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


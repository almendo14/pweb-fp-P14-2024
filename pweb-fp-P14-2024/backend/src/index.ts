import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db-connection';
import borrowRoutes from './routes/BorrowRoute';
import authRoutes from './routes/AuthRoute'
import operatorRoutes from './routes/OperatorRoute';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).send({
    status: "LYCAON AWOOOOOOOOOOOOO",
    date: currentTime,
  });
});

app.use('/admin/summary', borrowRoutes);
app.use('/admin/all-operator', operatorRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
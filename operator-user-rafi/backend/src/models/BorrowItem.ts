// src/models/BorrowItem.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrowItem extends Document {
  item_name: string;
  amount: number;
  borrow_date: Date;
  return_date: Date;
  borrower_name: string;
  officer_name: string;
}

const BorrowItemSchema: Schema = new Schema({
  item_name: { type: String, required: true },
  amount: { type: Number, required: true },
  borrow_date: { type: Date, default: Date.now },
  return_date: { type: Date, required: true },
  borrower_name: { type: String, required: true },
  officer_name: { type: String, required: true },
});

export default mongoose.model<IBorrowItem>('BorrowItem', BorrowItemSchema);

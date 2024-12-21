// src/models/Item.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  amount: number;
  condition: string;
  created_at: Date;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  condition: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IItem>('Item', ItemSchema);

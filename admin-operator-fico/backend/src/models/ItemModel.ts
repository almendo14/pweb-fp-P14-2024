import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    condition: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
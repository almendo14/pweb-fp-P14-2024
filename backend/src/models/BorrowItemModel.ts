import mongoose from 'mongoose';

const borrowItemSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    amount: { type: Number, required: true },
    borrow_date: { type: Date, required: true },
    return_date: { type: Date},
    borrower_name: { type: String},
    officer_name: { type: String},
});

const BorrowItem = mongoose.model('BorrowItem', borrowItemSchema);
export default BorrowItem;


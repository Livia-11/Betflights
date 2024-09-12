import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Order', OrderSchema);

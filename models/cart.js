import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
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
});

export default mongoose.model('Cart', CartSchema);

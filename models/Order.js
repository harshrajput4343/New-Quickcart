import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    _id: String,
    name: String,
    image: Array,
    offerPrice: Number,
    category: String
  },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Clerk string ID
  address: {   // embed full address snapshot so orders are immutable
    fullName: String,
    phoneNumber: String,
    pincode: String,
    area: String,
    city: String,
    state: String
  },
  items: [orderItemSchema],
  amount: { type: Number, required: true },  // total in dollars
  stripeSessionId: { type: String, default: null },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  status: { type: String, enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Order Placed' },
  date: { type: Number, default: Date.now }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;

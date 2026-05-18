import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Clerk string ID, NOT ObjectId
  fullName: { type: String, required: true, trim: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: { validator: v => /^\d{10}$/.test(v), message: 'Phone must be 10 digits' }
  },
  pincode: {
    type: String,
    required: true,
    validate: { validator: v => /^\d{6}$/.test(v), message: 'Pincode must be 6 digits' }
  },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);
export default Address;

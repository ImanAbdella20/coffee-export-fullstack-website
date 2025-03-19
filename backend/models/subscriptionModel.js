import mongoose from 'mongoose';


const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures each email is unique in the database
      lowercase: true,
    },
    plan: {
      type: String,
      enum: ['monthly', 'yearly'], // Only allows 'monthly' or 'yearly' as valid plan options
      required: true,
    }
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Create a model based on the schema
export const Subscription = mongoose.model('Subscription', subscriptionSchema);

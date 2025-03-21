import { Subscription } from "../models/subscriptionModel.js";

export const addSubscription = async (req, res) => {
  const { email, plan } = req.body;

  // Validate the request data
  if (!email || !plan) {
    return res.status(400).json({ message: 'Email and plan are required' });
  }

  try {
      // Await the result of finding an existing subscription
      const existingSubscription = await Subscription.findOne({ email });

      if (existingSubscription) {
          return res.status(409).json({ message: 'You have already subscribed!' });
      }

      // Create a new subscription document
      const newSubscription = new Subscription({
          email,
          plan
      });

      // Save the subscription to the database
      await newSubscription.save();

      // Send a success response
      res.status(201).json({ message: 'Subscription successful!', subscription: newSubscription });
  } catch (err) {
    console.error('Error saving subscription:', err);
    res.status(500).json({ message: 'Error processing your subscription. Please try again later.' });
  }
};

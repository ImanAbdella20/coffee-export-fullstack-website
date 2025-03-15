import {ShippingDetails} from '../models/shippingModel.js'

// POST route to handle form submission
export const addShippingDetail = async(req, res) => {
  const { fullName, address, city, postalCode, country, phoneNumber } = req.body;

  // Validate data (basic check)
  if (!fullName || !address || !city || !postalCode || !country || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    const existingShippingDetail  = await ShippingDetails.findOne({user: req.user._id})

    if(existingShippingDetail){

      return res.status(400).json({ message: 'User already has a shipping detail on file. Proceed to payment.' });
    }
    const shippingdetail = new ShippingDetails ({
        fullName,
        address,
        city,
        postalCode,
        country,
        phoneNumber,
        user:req.user._id
    })

    await shippingdetail.save();
    res.status(200).json({ message: 'Shipping details saved successfully!' });
  } catch (error) {
    console.error('Error saving shipping details:', error);
    res.status(500).json({ message: 'There was an error saving the shipping details.' });
  }
}


export const getShippingDetailByUserId = async (req, res) => {
  try {
    // Get the user ID from the request (it's already set by the authentication middleware)
    const userId = req.user._id;

    // Find the shipping details for the logged-in user
    const shippingdetails = await ShippingDetails.find({ user: userId });

    if (!shippingdetails || shippingdetails.length === 0) {
      return res.status(404).json({ message: 'No shipping details found for this user' });
    }

    // Return the shipping details in the response
    res.status(200).json({ shippingdetails });
  } catch (error) {
    console.error('Error retrieving shipping details:', error);
    res.status(500).json({ message: 'There was an error retrieving the shipping details.' });
  }
};

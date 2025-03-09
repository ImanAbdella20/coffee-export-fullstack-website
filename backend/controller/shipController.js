import {ShippingDetails} from '../models/shippingModel.js'

// POST route to handle form submission
export const addShippingDetail = async(req, res) => {
  const { fullName, address, city, postalCode, country, phoneNumber } = req.body;

  // Validate data (basic check)
  if (!fullName || !address || !city || !postalCode || !country || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    const shippingdetail = new ShippingDetails ({
        fullName,
        address,
        city,
        postalCode,
        country,
        phoneNumber,

    })

    await shippingdetail.save();
    res.status(200).json({ message: 'Shipping details saved successfully!' });
  } catch (error) {
    console.error('Error saving shipping details:', error);
    res.status(500).json({ message: 'There was an error saving the shipping details.' });
  }
}


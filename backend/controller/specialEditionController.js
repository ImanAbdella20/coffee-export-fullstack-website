import { SpecialEdition } from "../models/specialEditionModel.js";

// Controller function for adding a new special edition
export const addSpecialEdition = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, description, price, imageUrl, stock } = req.body;

    // Check if required fields are provided
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Create a new special edition product
    const newSpecialEdition = new SpecialEdition({
      name,
      description,
      price,
      imageUrl,  // Use imageUrl from the request body
      stock,
    });

    // Save the new product to the database
    const savedProduct = await newSpecialEdition.save();

    // Return the saved product
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};



export const getSpecialEdition = async(req , res) => {
  try {

    const specialCoffee = await SpecialEdition.find();
    
    res.status(200).json(specialCoffee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch special edition coffee.", error: error.message });
  }
};

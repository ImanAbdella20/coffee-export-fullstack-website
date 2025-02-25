import { Product } from "../models/productsmodel.js";

export const addProduct = async(req,res) =>{

try {
     // Extract product data from request body
const {name, image, weight, price, type, roastLevel, origin, flavour } = req.body;

// Check if all required fields are provided
if(!name  || !image || !weight || !price || !type || !roastLevel || !origin || !flavour){
    return res.status(400).json({ message: "All fields are required"}); 
}

// Create a new product instance

const newProduct = new Product({
    name,
      image,
      weight,
      price,
      type,
      roastLevel,
      origin,
      flavour,
})

 await newProduct.save()
return res.json({
    message:'Product saved successfully!',
    product:newProduct
})
} catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Failed to add product", error: error.message });
    
}
}
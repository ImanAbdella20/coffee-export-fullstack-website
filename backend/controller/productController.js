import { Product } from "../models/productsModel.js";

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

export const getProduct = async (req, res) => {
    try {
      const products = await Product.find();
  
      if (products.length > 0) {
        return res.status(200).json(products); // Send products if found
      }
  
      // If no products are found, send a 404 or 400 response
      return res.status(404).json({ message: 'Products not found!' });
  
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: 'Failed to fetch products.' });
    }
  };
  

  export const updateProduct = async(req,res) => {

    try {
    
const {id} = req.params;  
const {name, image, weight, price, type, roastLevel, origin, flavour } = req.body;

const updatedProduct = await Product.findByIdAndUpdate(id,{
  name, 
  image, 
  weight, 
  price, 
  type, 
  roastLevel,
   origin, 
   flavour
})

if(!updatedProduct){
return res.status(400).json({message:"No Product found !"})
}
    return res.status(200).json(updatedProduct)  
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Failed to update product", error: error.message });
    }
  }


  export const deleteProduct = async(req,res) => {

    try {
 
      
const {id} = req.params;  

const deletedProduct = await Product.findByIdAndDelete(id)
if(!deletedProduct){

return res.status(400).json({message:"No Product found !"})
}
        return res.status(200).json({message:"product deleted successfully!"})  
        
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Failed to update product", error: error.message });
    }
  }
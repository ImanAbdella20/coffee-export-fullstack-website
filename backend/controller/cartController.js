import {Cart} from '../models/cartModel.js';
import {Product} from '../models/productsModel.js';

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                userId,
                items: [{ productId, quantity, price: product.price }],
                totalPrice: product.price * quantity
            });
        } else {
            // Check if product is already in cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity and price
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].price = product.price; // Ensure updated price
            } else {
                // Add new product to cart
                cart.items.push({ productId, quantity, price: product.price });
            }

            // Recalculate total price
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};


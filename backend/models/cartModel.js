import mongoose from 'mongoose'

const cartModel = mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true

},

items:[{

    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1, 
        default: 1 
    },
    price: { 
        type: Number, 
        required: true 
    }

}],
totalPrice:{
    type:Number,
    required: true, 
    default: 0 
},

},{ timestamps: true })

export const  Cart = mongoose.model("Cart" , cartModel);
import mongoose from "mongoose";

const authModel = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    uid:{
        type:String,
        unique:true
    }

    
})

export const  User = mongoose.model("User" , authModel);
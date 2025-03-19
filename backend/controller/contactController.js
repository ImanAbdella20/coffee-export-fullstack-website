import { Contact } from "../models/contactModel.js";


export const addContact = async(req , res) => {

     const { username , email , message } = req.body;
   
     // Validate data (basic check)
     if (!username || !email || !message ) {
       return res.status(400).json({ message: 'All fields are required' });
     }
   
     try {
   const contactInfo = await Contact.findOne({email});

   if(contactInfo){
    // If the user exists, append the new message to the `message` array
    contactInfo.message.push(message);
    await contactInfo.save();
    res.status(200).json({ message: 'Message added successfully!' });
   }else
        contactInfo = new Contact ({
           username,
           email,
           message: [message]
       })
   
       await contactInfo.save();
       res.status(200).json({ message: 'Message saved successfully!' });
     } catch (error) {
       console.error('Error saving message:', error);
       res.status(500).json({ message: 'There was an error saving the message.' });
     }
   }

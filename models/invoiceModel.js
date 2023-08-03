const mongoose = require("mongoose");
const validator = require("validator");


const invoiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  sender: {
    type: String,
    lowercase: true,
    required: [true, "Please enter a sender name"],
  },
  receiver: {
    type: String,
    lowercase: true,
    required: [true, "Please enter a receiver name"],
  },
  style:{
    type: String,
    enum: ["1","2","3"],
    default: '1'
  },
  emailSent:{
    type: Boolean,
    default: false,
  },
  tax:{
    type: String,
  },
  itemName:{
    type: String,
  },
  itemPrice:{
    type: Number,
  },
  itemQuantity:{
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },

});




module.exports = mongoose.model("Invoice", invoiceSchema);

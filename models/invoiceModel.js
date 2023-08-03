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
    validate: [true, "Please enter a sender name"],
  },
  receiver: {
    type: String,
    lowercase: true,
    required: [true, "Please enter a receiver name"],
  },
  style:{
    type: String,
    enum: ["1","2","3"]
  },
  emailSent:{
    type: Boolean,
  },
  tax:{
    type: String,
  },
  items:[{
    name: String,
    quantity: Number,
    price: Number
  }]

});




module.exports = mongoose.model("Invoice", invoiceSchema);

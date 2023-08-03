const Invoice = require('../models/invoiceModel')

exports.sendmail = async (req, res, next) => {
    try {
    //   hi
    } catch (err) {
      let message = "unable to send mail"
      return res.render("error", {
        status: 400,
        message: message,
      });
    }
  };
  
  exports.createInvoice = async (req, res, next) => {
    try {
    //   hi
    console.log(req.body)
    let newInvoice = await Invoice.create(
      req.body
    )
    } catch (err) {
      let message = "unable to generate invoice"
      return res.render("error", {
        status: 400,
        message: message,
      });
    }
  };
  
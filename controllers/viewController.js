const Invoice = require('../models/invoiceModel')

exports.table = async (req, res, next) => {
  let invoices = await Invoice.find()

  res.json({
    invoices
  })
};

exports.getInvoice = async (req, res, next) => {
  let invoices = await Invoice.findById(req.params.id)

  res.json({
    invoices
  })
};

exports.files = async (req, res, next) => {
  res.status(200).render("files");
};

exports.contact = async (req, res, next) => {
  res.status(200).render("contact");
};

// exports.login = async (req, res, next) => {
//   res.status(200).render('login', {message:""});
// };

exports.loginCheck = async (req, res, next) => {
  if (req.body.id == "admin" && req.body.password == "admin") {
    res.redirect("/dashboard");

  }
  else{
    res.render("login",{message: "Invalid username/password"});
  }
};

exports.dashboard = async (req, res, next) => {
  res.status(200).render('dashboard');
};

exports.changeTitle = async (req, res, next) => {
  let title =  await Data.findOneAndUpdate({name:'title'},{data:req.body.data})

  res.status(200).redirect('/');
};

exports.changeAddress = async (req, res, next) => {
  let title = await  Data.findOneAndUpdate({name:'address'},{data:req.body.data})

  res.status(200).redirect('/');
};

exports.changeEmail = async (req, res, next) => {
  let title = await  Data.findOneAndUpdate({name:'email'},{data:req.body.data})

  res.status(200).redirect('/');
};

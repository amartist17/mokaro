// const Data = require('../models/dataModel')

exports.home = async (req, res, next) => {
  let title = await Data.findOne({name: "title"})
  let email = await Data.findOne({name: "email"})
  let address = await Data.findOne({name: "address"})

  res.status(200).render("index", {
    title: title.data,
    email: email.data,
    address: address.data
  });
};

exports.files = async (req, res, next) => {
  res.status(200).render("files");
};

exports.contact = async (req, res, next) => {
  res.status(200).render("contact");
};

exports.login = async (req, res, next) => {
  res.status(200).render('login', {message:""});
};

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

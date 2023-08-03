const { promisify } = require("util");
const User = require("./../models/userModel");
// const APIFeatures = require('./../utils/apifeatures');
// const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");
// const SendEmail = require('./../utils/email');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { token } = require("morgan");
const nodemailer = require("nodemailer");
const { findByIdAndUpdate } = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  let cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log(cookieOptions);
  if (process.env.ENVIRONMENT === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
//   res.redirect("/dashboard");
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    let message = `Duplicate value: ${Object.values(err.keyValue)[0]} for ${
      Object.keys(err.keyValue)[0]
    } field`;
    return res.render("error", {
      status: 400,
      message: message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.render("error", {
      status: 400,
      message: "Please provide email and password",
    });
  // return next(new AppError("Please provide email and password", 400));

  let user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.passwordCheck(password, user.password)))
    // return next(new AppError("Invalid email or password", 401));
    return res.render("error", {
      status: 401,
      message: "Invalid email or password",
    });
  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token)
    
    return res.redirect("/login");

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    
    return res.render("error", {
      status: 401,
      message: "User belonging to this token doesn't Exist",
    });

 

  req.user = currentUser;
  next();
};


exports.isLoggedIn = async (req, res, next) => {
  // 1) Token exists?
  if (req.cookies.jwt) {
    // 2)Verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    //   3) Check if user still exists (not deleted)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next();

    // 4) Check if password changed
    // if (currentUser.passwordChangedAfter(decoded.iat)) {
    //   return next();
    // }

    // User is logged in
    res.locals.user = currentUser;
    return next();
  }
  res.locals.user = null;
  next();
};

exports.logout = (req, res) => {
  res.cookie("jwt", "Logged Out", {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  // res.status(200).json({
  //   status: 'success',
  // });
  res.redirect("/");
};


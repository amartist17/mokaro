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
  
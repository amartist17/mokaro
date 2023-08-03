const Invoice = require('../models/invoiceModel')
const nodemailer = require("nodemailer");

exports.sendmail = async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mokaro.agumentik@gmail.com",
        pass: process.env.EMAILKEY,
      },
    });

    async function notifyCustomer() {
      data = { "UserName": "Sanjay Kumar", "Amount": 200 };
      let info = await transporter.sendMail({
        from: `"Manager of Sales" <mokaro.agumentik@gmail.com>`,
        to: `${req.body.reciever}`,
        subject: `✅ Your invoice in Mokaro is generated for this month.`,
        html: `
                <div style="display: flex; justify-content: center;">
        <table style="max-width: 600px; background-color: rgb(241, 255, 255); margin: 0 auto;" width="100%"
            cellpadding="0" cellspacing="0">
            <tr>
                <td style="background-color: #02595f; text-align: center;">
                    <img style="max-width: 100%;" src="https://i.ibb.co/kD3f4Lj/Mokato-Banner.jpg" alt="">
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #01445f;">
                    Your invoice has been generated with us.</td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: justify; font-size: 16px; color: #3d5d36;">
                    <h4>Hello dear ${data.UserName},</h4>
                    <p>Greetings of the day,
                        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This email is to inform you that you have an
                        invoice generated with Mokaro for this month. We have sent you the amount in this mail. If you
                        want to see the full invoice you can click the button below.
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 20px; text-align: center;">
                    <a href=http://127.0.0.1:3000/getInvoice/${req.body.invoiceId}
                        style="display: inline-block; background-color: #3375cc; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View
                        Invoice</a>
                </td>
            </tr>
            <tr>
                <td
                    style="background-color: #36515d; text-align: center; padding: 6px; color: #ffffff; font-size: 14px;">
                    &copy; Mokaro. All rights reserved.
                </td>
            </tr>
        </table>
    </div>
            `,
      });
      // console.log(info.messageId);
    }

    notifyCustomer();
    res.send("mail sent")
  } catch (err) {
    let message = "unable to send mail"
    console.log(err)
    return res.json({
      err
    })
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
  console.log(req.body)
  let newInvoice = await Invoice.create(
    req.body
  )
  res.json(newInvoice)
  } catch (err) {
    let message = "unable to generate invoice"
    return res.json({
      err
    })
  }
};
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.MYEMAILPASSWORD,
  },
});

const sendEmail = async (receiver, subject, html) => {
  const mailOptions = {
    from: process.env.MYEMAIL,
    to: receiver,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

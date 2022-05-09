var nodemailer = require("nodemailer");
const config = require("../../config/config");
module.exports = {
  async sendEmail({ email, subject, content }) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: config.emailAuth,
    });

    var mailOptions = {
      from: config.emailAuth.user,
      to: email,
      subject: subject,
      text: content,
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  },
};

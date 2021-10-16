require("dotenv").config({ path: "./config.env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ email, title, text }) => {
  const msg = {
    to: { email }, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: title,
    html: text,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;

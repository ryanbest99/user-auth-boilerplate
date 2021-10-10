require("dotenv").config({ path: "./config.env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ email, token }) => {
  const msg = {
    to: { email }, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: "Please Verify your email",
    // text: "and easy to do anywhere, even with Node.js",
    html: `
      <h1>Please use the following link to activate your accound</h1>
      <strong>${process.env.CLIENT_URL}/auth/activate/${token}</strong>
      <hr />
      <p>This Email may have sensitive information</p>
    `,
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

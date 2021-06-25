const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

let oauth2Client = new OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

class mail {
  constructor(__to, __html) {
    this.mailObj = {
      from: process.env.EMAIL_CLIENT_MAIL,
      to: __to,
      subject: "Verification email from The Year Book",
      generateTextFromHTML: true,
      html: __html,
    };
  }

  async send(__mail) {
    try {
      oauth2Client.setCredentials({
        refresh_token: process.env.EMAIL_REFRESH_TOKEN,
      });
      let accessToken = await oauth2Client.getAccessToken();
      let smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_CLIENT_MAIL,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      await smtpTransport.sendMail(this.mailObj);
    } catch (error) {
      throw error;
    }
  }
}

module.exports.Mail = mail;

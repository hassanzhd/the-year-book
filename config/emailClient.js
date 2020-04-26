const nodemailer = require("nodemailer");
const util = require("./globals");
class mail {
  constructor(__to, __html) {
    this.from = "mails.yearbook@gmail.com";
    this.to = __to;
    this.subject = "Verification email from The Year Book";
    this.generateTextFromHTML = true;
    this.html = __html;
  }
}

module.exports.smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "mails.yearbook@gmail.com",
    clientId: util.clientId,
    clientSecret: util.clientSecret,
    refreshToken: util.refreshToken,
  },
});

module.exports.Mail = mail;

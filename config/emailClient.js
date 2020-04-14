const nodemailer = require("nodemailer");

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
    clientId:
      "356096036225-a763aub7hbvg3etp5cr0sngfs344rl6n.apps.googleusercontent.com",
    clientSecret: "xq6l6moQ5zEyhSZ2qv-fKWA5",
    refreshToken:
      "1//045mRcHnPw11ICgYIARAAGAQSNwF-L9Ir6x8X5BPjhLYWM1fa0jBPJfejlI3izkM_5-XnFQvxCSofVcBGIGEKT3huCKoqn7xc41M",
  },
});

module.exports.Mail = mail;

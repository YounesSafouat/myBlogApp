const nodemailer = require("nodemailer");
require('dotenv').config()
exports.mailer = (mail,subject,html)=>{
     const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.user,
            pass: process.env.pass,
          },
        });
        const options = {
          format: process.env.user,
          to: mail,
          subject ,
          html,
        };
        transporter.sendMail(options, (err, info) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log("sent", info.response);
          }
        });
        
}
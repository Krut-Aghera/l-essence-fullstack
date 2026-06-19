import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
      theme: "default",
      product: {
            name: `${process.env.APP_NAME}`,
            link: `${process.env.APP_EMAIL}`
      }
});


const mailTransporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD
      }
});


export {
      mailGenerator,
      mailTransporter
}
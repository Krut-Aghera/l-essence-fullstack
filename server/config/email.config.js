import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
      theme: "default",
      product: {
            name: `${process.env.APP_NAME}`,
            link: `${process.env.APP_EMAIL}`,
      },
});

const mailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
      },
});


mailTransporter.verify((error, success) => {
      if (error) {
            console.error("SMTP Error:", error);
      } else {
            console.log("SMTP server is ready");
      }
});

export { mailGenerator, mailTransporter };

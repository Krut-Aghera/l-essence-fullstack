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
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export { mailGenerator, mailTransporter };

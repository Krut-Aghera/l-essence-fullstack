import axios from "axios";
import { mailGenerator } from "../config/email.config.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const passwordResetTemplate = (userName, resetURL) => {
    const mailBody = {
        body: {
            name: userName,
            intro: "You have requested to reset your password. Please click the button below to proceed.",
            action: {
                instructuions: "To reset your password, please click here : ",
                button: {
                    color: "#26448a",
                    text: "Reset Password",
                    link: resetURL,
                },
            },
        },
    };
    return mailBody;
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const sendEmail = async (emailOptions) => {
    try {
        const html = mailGenerator.generate(emailOptions.mailContent);
        const text = mailGenerator.generatePlaintext(emailOptions.mailContent);

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: process.env.APP_NAME,
                    email: process.env.APP_EMAIL,
                },

                to: [
                    {
                        email: emailOptions.userEmail,
                    },
                ],

                subject: emailOptions.subject,

                htmlContent: html,

                textContent: text,
            },
            {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                },
            }
        );

        return {
            success: true,
            message: "Email sent successfully",
        };
    } catch (error) {
        console.error("Brevo Error:", error.response?.data || error.message);

        return {
            success: false,
            message: error.response?.data?.message || "Error sending email.",
        };
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export { passwordResetTemplate, sendEmail };

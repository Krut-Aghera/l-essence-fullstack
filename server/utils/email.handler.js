import { mailGenerator, mailTransporter } from "../config/email.config.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const emailVerificationTemplate = (userName, verificationURL) => {
      const mailBody = {
            body: {
                  name: userName,
                  intro: "Welcome to our service! We're very excited to have you on board.",
                  action: {
                        instructuions:
                              "To verify your email and get started with your account, please click here : ",
                        button: {
                              color: "#26448a",
                              text: "Verify Email",
                              link: verificationURL,
                        },
                  },
            },
      };
      return mailBody;
};

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
      const emailTextualContent = mailGenerator.generate(emailOptions.mailContent);
      const emailMarkupContent = mailGenerator.generatePlaintext(emailOptions.mailContent);

      const mail = {
            from: process.env.APP_EMAIL,
            to: emailOptions.userEmail,
            subject: emailOptions.subject,
            html: emailTextualContent,
            text: emailMarkupContent,
      };

      try {
            await mailTransporter.sendMail(mail);
            return {
                  success: true,
                  message: "Email sent successfully",
            };
      } catch (error) {
            console.error("Error sending email:", error);
            return {
                  success: false,
                  message: error.message || "Error sending email. Please try again later.",
            };
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export { emailVerificationTemplate, passwordResetTemplate, sendEmail };

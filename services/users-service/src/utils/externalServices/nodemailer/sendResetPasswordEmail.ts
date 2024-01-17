import nodemailer from "nodemailer";
import Mailgen, { Content, ContentBody, Action } from "mailgen";

const sendEmailForResetPassword = async (email: string, token: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const action: Action = {
    instructions: "To reset your password, click the button below:",
    button: {
      color: "#22BC66",
      text: "Change Password",
      link: `${process.env.CLIENT_URL}/${link}?me=${token}`,
    },
  };

  const responseBody: ContentBody = {
    name: "Change Your password by clicking below button",
    intro: `Dear User,

            Follow the process to change your password.
            Click the below button. 
            You will be directed to a secure page where you can change your password.
            Set a secure password for you.             
            Please note that the verification link is only valid for the next 10 minutes for security reasons. If you don't complete the process within this time frame, you may need to request once again`,
    action,
    outro: "Thank you for choosing us, and we appreciate your trust in our services",
  };

  const responsePage: Content = {
    body: responseBody,
  };

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const mail = mailGenerator.generate(responsePage);
  const message = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Reset Password",
    html: mail,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error: any, info: any) => {
      if (error) {
        console.error('Error happened in nodemailer:', error);
        reject(false);
      } else {
        console.log('Email sent successfully');
        resolve(true);
      }
    });
  });
};

export default sendEmailForResetPassword;

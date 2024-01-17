import nodemailer from 'nodemailer'


const sendOtp = ( otp: number, email: string) => {
    console.log(email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "OTP",
      text: `<#> Its your OTP from ep link to create an account with
            this e-mail is ${otp}. Do not share it with anyone by any means.
            This is confidential and to be used for you only `
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailDetails, ( error: any, info: any) => {
          if (error) {
              console.log('error happened in nodemailer'+error);
              reject(false)
          } else {
              console.log('Email sent successfully');
              resolve(true)
          }
        });
    })
}

export default sendOtp;





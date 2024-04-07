import { createTransport } from 'nodemailer';


const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export async function sendEmail(email, subject, body) {
  const emailData = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: body,
  }
  const result = await transporter.sendMail(emailData);

  return result;
}
import { createTransport } from 'nodemailer';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    await sendEmail(body.email, body.subject, body.message, transporter);

    return JSON.stringify({ status: "ok" });
  } catch (e) {
    console.log("Catch Blocck: ", e)
    return JSON.stringify({ status: "error" });
  }
};



async function sendEmail(email, subject, body, transporter) {
  const emailData = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: body,
  }
  const result = await transporter.sendMail(emailData);

  return result;
}
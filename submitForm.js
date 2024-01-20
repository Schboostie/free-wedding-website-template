// submitForm.js

const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  const { name, email, guests, attending, message } = JSON.parse(event.body);

  // Validate the form data if needed

  // Create a transporter using nodemailer (you may need to configure this)
  const transporter = nodemailer.createTransport({
    // Your email service configuration
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_email_password",
    },
  });

  // Define the email message
  const mailOptions = {
    from: "your_email@gmail.com",
    to: "schboostie@gmail.com", // Change to your desired recipient email address
    subject: "RSVP Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Guests: ${guests}
      Attending: ${attending}
      Message: ${message}
    `,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error.message);
  }

  // Return a response to the client
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "RSVP submitted successfully!" }),
  };
};

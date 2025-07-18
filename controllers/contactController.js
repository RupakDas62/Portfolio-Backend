const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // App Password
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // для 587
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔍 проверка соединения (очень важно)
    await transporter.verify();
    console.log("✅ SMTP ready");

    const info = await transporter.sendMail({
      from: `"Electro Etalon" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};
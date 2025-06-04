import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nouvelle demande de contact de ${name}`,
      text: message,
      html: `<p>${message}</p><p>Email: ${email}</p>`
    });

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: email,
      subject: 'Votre demande a bien été reçue',
      text: `Bonjour ${name},\n\nNous avons bien reçu votre message :\n${message}\n\nNous reviendrons vers vous rapidement.`,
      html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message :</p><p>${message}</p><p>Nous reviendrons vers vous rapidement.</p>`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi du mail' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

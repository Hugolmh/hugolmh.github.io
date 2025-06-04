import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Utilisation d'un compte de test Ethereal pour éviter de saisir des identifiants SMTP
// Les e-mails ne sont pas réellement envoyés mais consultables via une URL de prévisualisation
const testAccountPromise = nodemailer.createTestAccount();

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    const testAccount = await testAccountPromise;
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const adminMail = process.env.CONTACT_EMAIL || 'no-reply@example.com';

    const infoAdmin = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: adminMail,
      subject: `Nouvelle demande de contact de ${name}`,
      text: message,
      html: `<p>${message}</p><p>Email: ${email}</p>`
    });

    console.log('Message admin envoyé: %s', infoAdmin.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(infoAdmin));

    const infoUser = await transporter.sendMail({
      from: adminMail,
      to: email,
      subject: 'Votre demande a bien été reçue',
      text: `Bonjour ${name},\n\nNous avons bien reçu votre message :\n${message}\n\nNous reviendrons vers vous rapidement.`,
      html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message :</p><p>${message}</p><p>Nous reviendrons vers vous rapidement.</p>`
    });

    console.log('Message utilisateur envoyé: %s', infoUser.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(infoUser));

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

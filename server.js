require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON e servir arquivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para envio de e-mail
app.post('/send-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contato Leilão Neves Car Parking" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Nova mensagem do site',
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong><br>${mensagem}</p>
      `,
    });

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

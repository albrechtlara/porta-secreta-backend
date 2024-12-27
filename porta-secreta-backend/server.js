const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "albrechtlara@gmail.com", // Substitua pelo seu e-mail
        pass: "izjk wniy hutb tlgr",       // Substitua pela senha ou chave do app
    },
});

// Rota para envio de e-mail
app.post("/send-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "E-mail é obrigatório." });
    }

    const mailOptions = {
        from: "seu-email@gmail.com",
        to: "daniel.dante@me.com",
        subject: "PortaSurpresa",
        text: `Um jogador entrou no jogo com o e-mail: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Erro ao enviar e-mail." });
    }
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


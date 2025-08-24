import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const verifyToken = process.env.VERIFY_TOKEN || "mipassword";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const verify_token = req.query["hub.verify_token"];

  if (mode && verify_token === verifyToken) {
    console.log("Webhook verificado!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  const data = req.body;
  console.log("📩 Nuevo mensaje:", JSON.stringify(data, null, 2));

  if (data.entry && data.entry[0].changes[0].value.messages) {
    const message = data.entry[0].changes[0].value.messages[0];
    const from = message.from;
    const text = message.text?.body || "Mensaje vacío";

    await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: `👋 Hola! Recibí tu mensaje: ${text}` },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Servidor escuchando en puerto ${PORT}`));
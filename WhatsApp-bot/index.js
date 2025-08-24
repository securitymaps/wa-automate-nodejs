import { create } from '@open-wa/wa-automate';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables del archivo .env

create({
  sessionId: "my-bot",
  multiDevice: true, 
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body.toLowerCase() === "hola") {
      await client.sendText(
        message.from,
        `👋 Hola! Tu bot ya está funcionando.\n\n📱 Phone Number ID: ${process.env.PHONE_NUMBER_ID}`
      );
    }
  });
}
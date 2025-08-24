import { create } from '@open-wa/wa-automate';

create({
  sessionId: "my-bot",
  multiDevice: true, // usa siempre true
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body.toLowerCase() === "hola") {
      await client.sendText(message.from, "👋 Hola! Soy tu bot.");
    }
  });
}
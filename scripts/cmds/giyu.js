const axios = require('axios');

async function a(api, event, args, message) {
  try {
    const a = args.join(" ").trim();

    if (!a) {
      return message.reply("ex: {p}giyu {prompt} ");
    }

    const b = "you are giyu ai"; // the more better content you give the  best it became
    const c = await d(a, b);

    if (c.code === 2 && c.message === "success") {
      message.reply(c.answer, (r, s) => {
        global.GoatBot.onReply.set(s.messageID, {
          commandName: module.exports.config.name,
          uid: event.senderID 
        });
      });
    } else {
      message.reply("Please try again later.");
    }
  } catch (e) {
    console.error("Error:", e);
    message.reply("An error occurred while processing your request.");
  }
}

async function d(a, b) {
  try {
    const d = await axios.get(`https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(a)}&content=${encodeURIComponent(b)}`);
    return d.data;
  } catch (f) {
    console.error("Error from api", f.message);
    throw f;
  }
}

module.exports = {
  config: {
    name: "giyu",
    version: "1.0",
    author: "Gab Yu",
    role: 0,
    longDescription: "lalaking ai",
    category: "ai",
    guide: {
      en: "{p}giyu [prompt]"
    }
  },
  
  handleCommand: a,
  onStart: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  },
  onReply: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  }
};
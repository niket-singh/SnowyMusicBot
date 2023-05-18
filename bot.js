const Discord = require("discord.js");
const { createPlaylist } = require("spotify-web-api-node");
const { soundcloud } = require("soundcloud");

const client = new Discord.Client();

const TOKEN = process.env.TOKEN;



client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;

  const command = message.content.slice(client.prefix.length);

  switch (command) {
    case "play":
      const song = message.mentions.first() || message.content.split(" ")[1];

      if (song.startsWith("spotify:") || song.startsWith("soundcloud:")) {
        const url = song;
      } else {
        url = `https://www.youtube.com/watch?v=${song}`;
      }

      try {
        const response = await fetch(url);
        const audio = await response.arrayBuffer();

        const player = await client.joinVoiceChannel(message.guild.voiceChannels.first());
        player.play(audio);

        message.channel.send("Playing `" + song + "`");
      } catch (error) {
        message.channel.send("Could not find song.");
      }
      break;

    case "stop":
      if (player) {
        player.stop();
        message.channel.send("Stopped playing.");
      }
      break;

    case "pause":
      if (player) {
        player.pause();
        message.channel.send("Paused playing.");
      }
      break;

    case "resume":
      if (player) {
        player.resume();
        message.channel.send("Resumed playing.");
      }
      break;

    case "skip":
      if (player) {
        player.skip();
        message.channel.send("Skipped to next song.");
      }
      break;

    case "queue":
      if (player) {
        message.channel.send("The queue is: " + player.queue.join(", "));
      }
      break;

    case "clear":
      if (player) {
        player.queue.clear();
        message.channel.send("The queue has been cleared.");
      }
      break;

    case "volume":
      if (player) {
        const volume = message.content.split(" ")[1];
        player.setVolume(volume);
        message.channel.send("The volume has been set to " + volume);
      }
      break;

    case "increase volume":
      if (player) {
        player.increaseVolume();
        message.channel.send("The volume has been increased.");
      }
      break;

    case "decrease volume":
      if (player) {
        player.decreaseVolume();
        message.channel.send("The volume has been decreased.");
      }
      break;

    default:
      message.channel.send("Unknown command.");
      break;
  }
});

client.login('MTEwODY2NTIyNjk4MDc1MzQ4OA.GQTv4e.zEI0_eJG-iTXL1Cgm_llyACBAqvAfV3O_-_GhQ');

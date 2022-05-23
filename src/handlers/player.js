const c = require("../index.js");
const dplayer = require("discord-player");
const tPlayer = require("../tools/commands/tPlayer");

const player = new dplayer.Player(c);
player.on("trackStart", async (queue, track) => {
    await queue.metadata.channel.send({
        embeds: [tPlayer.playingEmbed(queue)]
    });
});

module.exports = player;
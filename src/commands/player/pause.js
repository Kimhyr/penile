const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "pause",

    async execute(c, m, a) {
        if (!await tPlayer.checkVCMVC(m)) {
            return;
        }

        const queue = tPlayer.checkQueuePlaying(m);
        if (!queue) {
            return;
        }

        const embed = tPlayer.playingEmbed(queue);
        embed.author = {
            name: "Paused"
        }

        await queue.setPaused(true);

        await m.reply({
            embeds: [embed]
        });
    }
}
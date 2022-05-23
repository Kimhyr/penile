const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "resume",

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
            name: "Resumed"
        }

        await queue.setPaused(false);

        await m.reply({
            embeds: [embed]
        });
    }
}
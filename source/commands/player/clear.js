const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "clear",

    async execute(c, m, a) {
        if (!await tPlayer.checkVCMVC(m)) {
            return;
        }

        const queue = tPlayer.checkQueueTracks(m);
        if (!queue) {
            return;
        }

        const embed = tPlayer.queueEmbed(queue);
        embed.author = {
            name: "Cleared"
        }

        await queue.clear();

        await m.reply({
            embeds: [embed]
        });
    }
}

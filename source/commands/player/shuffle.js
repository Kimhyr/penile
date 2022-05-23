const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "shuffle",

    async execute(c, m, a) {
        if (!await tPlayer.checkVCMVC(m)) {
            return;
        }

        const queue = await tPlayer.checkQueueTracks(m);
        if (!queue) {
            return;
        }

        await queue.shuffle();

        const embed = tPlayer.queueEmbed(queue);
        embed.author = {
            name: "Shuffled"
        }

        await m.reply({
            embeds: [embed]
        });
    }
}
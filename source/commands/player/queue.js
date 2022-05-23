const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "queue",

    async execute(c, m, a) {
        const queue = tPlayer.checkQueuePlaying(m);
        if (!queue) {
            return;
        }

        await m.reply({
            embeds: [tPlayer.queueEmbed(queue)]
        });
    }
}
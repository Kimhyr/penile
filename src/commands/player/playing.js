const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "playing",

    async execute(c, m, a) {
        const queue = tPlayer.checkQueuePlaying(m);
        if (!queue) {
            return;
        }

        await m.reply({
            embeds: [tPlayer.playingEmbed(queue)]
        });
    }
}
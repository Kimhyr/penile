const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "skip",

    async execute(c, m, a) {
        if (!await tPlayer.checkVCMVC(m)) {
            return;
        }

        const queue = await tPlayer.checkQueuePlaying(m);
        if (!queue) {
            return;
        }

        let pos = 0;
        if (a[0]) {
            pos = a[0];

            if (isNaN(pos)) {
                const embed = {
                    color: tColors.RED,
                    title: "That position is not a number!"
                }

                await m.reply({
                    embeds: [embed]
                });

                return;
            }

            pos -= 1;
            if (pos < 0 || pos > queue.tracks.length) {
                const embed = {
                    color: tColors.RED,
                    title: "That position is out of range!"
                }

                await m.reply({
                    embeds: [embed]
                });

                return;
            }
        }

        const embed = tPlayer.playingEmbed(queue);
        embed.author = {
            name: "Skipped"
        }

        try {
            await queue.skipTo(pos);
        } catch {
            await queue.skip();
        }

        await m.reply({
            embeds: [embed]
        });
    }
}
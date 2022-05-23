const tColors = require("../../tools/tColors");

module.exports = {
    name: "ping",

    async execute(c, m, a) {
        const embed = {
            color: tColors.BLURPLE,
            title: "Pong!"
        }
        
        await m.reply({
            embeds: [embed]
        });
    }
}
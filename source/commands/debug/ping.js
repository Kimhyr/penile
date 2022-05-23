const colors = require("../../tools/tColors");

module.exports = {
    name: "ping",

    async execute(c, m, a) {
        const embed = {
            color: colors.BLURPLE,
            title: "Pong!"
        }
        
        await m.reply({
            embeds: [embed]
        });
    }
}
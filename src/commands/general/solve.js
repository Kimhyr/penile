const math = require("mathjs");
const tColors = require("../../tools/tColors");

module.exports = {
    name: "solve",

    async execute(c, m, a) {
        const exp = a.join(" ");
        try {
            const embed = {
                color: tColors.GREYPLE,
                title: exp,
                description: `\`= ${math.evaluate(exp)}\``
            }

            m.reply({
                embeds: [embed]
            });
        } catch {
            const embed = {
                color: tColors.RED,
                title: "I could not evaluate your expression."
            }

            m.reply({
                embeds: [embed]
            });
        }
    }
}
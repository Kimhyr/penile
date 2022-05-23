const djs = require("discord.js");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "purge",

    async execute(c, m, a) {
        if (!m.member.permissions.has(djs.Permissions.FLAGS.MANAGE_MESSAGES)) {
            return;
        }

        const limit = a[0];
        if (isNaN(limit)) {
            const embed = {
                color: tColors.RED,
                title: "Limit must be an integer!",
                description: "`!isNaN(limit)`"
            }

            m.reply({
                embeds: [embed]
            });

            return;
        } else if (limit < 0 && limit > 100) {
            const embed = {
                color: tColors.RED,
                title: "Limit is out of bounds!",
                description: "`limit > 0 && limit < 100`"
            }

            m.reply({
                embeds: [embed]
            });

            return;
        }

        const fetched = await m.channel.message.fetch({
            limit: limit
        });

        try {
            await m.channel.bulkDelete(fetched)
                .then(async msgs => {
                    const embed = {
                        color: tColors.BLURPLE,
                        author: {
                            name: "Purged"
                        },
                        title: `${msgs.size} messages.`,
                        
                    }

                    await m.channel.send({
                        embeds: [embed]
                    });
                })
        } catch (err) {
            const embed = {
                color: tColors.RED,
                title: "There was an error deleting messages!",
                description: `\`${err}\``
            }

            await m.channel.send({
                embeds: [embed]
            });
        }
    }
}
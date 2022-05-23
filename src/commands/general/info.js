const djs = require("discord.js");
const tColors = require("../../tools/tColors");

module.exports = {
    name: "info",

    async execute(c, m, a) {
        console.log(m.mentions.member)
        const mention = 
            m.mentions.members.first()
            m.guild.members.cache.get(a[0]) ||
            m.member;

        if (!mention) {
            const embed = {
                color: tColors.RED,
                title: "That mention is invalid!",
                description: "`msg.mentions.member.first() || msg.guild.members.cache.get(args[0]) || msg.member`"
            }

            await m.reply({
                embeds: [embed]
            });

            return;
        }

        let status;
        try {
            switch (mention.presence.status) {
            case "online": status = tColors.GREEN;
                break;
            case "dnd": status = tColors.RED;
                break;
            case "idle": status = tColors.YELLOW;
                break;
            }
        } catch {
            status = tColors.GREYPLE;
        }

        let activity;
        try {
            switch (mention.presence.activities[0].type) {
            case "LISTENING": activity = `**${mention.presence.activities[0].details}**
                by ${mention.presence.activities[0].state}`;
                break;
            case "PLAYING": activity = `Playing **${mention.presence.activities[0].name}**
                ${mention.presence.activities[0].details}
                ${mention.presence.activities[0].state}`;
                break;
            case "WATCHING": activity = `Watching **${mention.presence.activities[0].name}**
                ${mention.presence.activities[0].details}
                ${mention.presence.activities[0].state}`;
                break;
            case "STREAMING": activity = `Streaming to **${mention.presence.activities[0].name}**
                ${mention.presence.activities[0].details}
                ${mention.presence.activities[0].state}`;
                break;
            case "CUSTOM": activity = mention.presence.activities[0].state
                break;
            case "COMPETING": activity = `**${mention.presence.activities[0].name}**
                ${mention.presence.activities[0].details}
                ${mention.presence.activities[0].state}`;
                
                break;
            }
        } catch {
            activity = undefined;
        }

        const embed = {
            color: status,
            author: {
                name: mention.user.id
            },
            title: mention.user.tag,
            thumbnail: {
                url: mention.user.avatarURL()
            },
            description: activity,
            fields: [
                {
                    name: "Created",
                    value: `\`${mention.user.createdAt.toLocaleDateString("en-us")}\``,
                    inline: true
                },
                {
                    name: "Joined",
                    value: `\`${mention.joinedAt.toLocaleDateString("en-us")}\``,
                    inline: true
                }
            ]
        }

        await m.reply({
            embeds: [embed]
        });
    }
}
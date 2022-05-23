const player = require("../../handlers/player");

const tColors = require("../tColors");

module.exports = {
    playingEmbed(queue) {
        const embed = {
            color: tColors.PURPLE,
            author: {
                name: "Playing"
            },
            title: queue.nowPlaying().title,
            url: queue.nowPlaying().url,
            thumbnail: {
                url: queue.nowPlaying().thumbnail
            },
            description: `by ${queue.nowPlaying().author}\n**${queue.createProgressBar()}**`,
            fields: [
                {
                    name: "\u200b",
                    value: "\u200b"
                }
            ]
        }

        if (queue.tracks[0]) {
            embed.fields[0] = {
                name: "Playing Next",
                value: `\`1\` | **${queue.tracks[0].title}**\nby ${queue.tracks[0].author}`
            }
        }

        return embed;
    },

    queueEmbed(queue) {
        const embed = this.playingEmbed(queue);
        if (queue.tracks[0]) {
            let trackList = [];

            for (let i = 0; i < queue.tracks.length; i++) {
                if (i > 4) {
                    break;
                }

                trackList.push(
                    `\`${i+1}\` | **${queue.tracks[i].title}**\nby ${queue.tracks[i].author}\n`
                );
            }

            embed.fields[0] = {
                name: "Queue",
                value: trackList.join("\n")
            }
        }

        return embed;
    },

    async checkVCMVC(m) {
        const voiceChannel = m.member.voice.channelId;
        const myVoiceChannel = m.guild.me.voice.channelId;
        if (!m.member.permissions.has(djs.Permissions.FLAGS.MOVE_MEMBERS)) {
            if (myVoiceChannel && voiceChannel !== myVoiceChannel) {
                const embed = {
                    color: tColors.RED,
                    title: "You are not in my voice channel!"
                }

                await m.reply({
                    embeds: [embed]
                });

                return false;
            }
        }

        return true;
    },

    async checkQueue(m) {
        const queue = player.getQueue(m.guild);
        if (!queue) {
            const embed = {
                color: tColors.RED,
                title: "There is no queue!"
            }

            await m.reply({
                embeds: [embed]
            });

            return false;
        }

        return queue;
    },


    async checkQueuePlaying(m) {
        const queue = player.getQueue(m.guild);
        if (!await this.checkQueue(m)) {
            return false;
        } else if (!queue.playing) {
            const embed = {
                color: tColors.RED,
                title: "There is nothing playing!"
            }

            await m.reply({
                embeds: [embed]
            });

            return false;
        }

        return queue;
    },

    async checkQueueTracks(m) {
        const queue = player.getQueue(m.guild);
        if (!await this.checkQueue(m)) {
            return false;
        } else if (!queue.tracks[0]) {
            const embed = {
                color: tColors.RED,
                title: "There are no tracks in the playlist!"
            }

            await m.reply({
                embeds: [embed]
            });

            return false;
        }

        return queue;
    }
}
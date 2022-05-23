const djs = require("discord.js");
const player = require("../../handlers/player");
const tPlayer = require("../../tools/commands/tPlayer");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "play",

    async execute(c, m, a) {
        const voiceChannel = m.member.voice.channelId;
        if (!voiceChannel) {
            const embed = {
                color: tColors.RED,
                title: "You are not in a voice channel!"
            }

            await m.reply({
                embeds: [embed]
            });

            return;
        }

        if (!await tPlayer.checkVCMVC(m)) {
            return;
        }

        if (!a[0]) {
            const embed = {
                color: tColors.RED,
                title: "Provide a query!",
                description: "`play {query}`"
            }

            await m.reply({
                embeds: [embed]
            });

            return;
        }

        let queue = player.getQueue(m.guild);
        if (!queue) {
            queue = player.createQueue(m.guild, {
                metadata: {
                    channel: m.channel
                }
            });
        }

        const query = a
            .slice(0)
            .join(" ");

        try {
            if (!queue.connection) {
                await queue.connect(m.member.voice.channel);
            }
        } catch (err) {
            await queue.destroy();

            const embed = {
                color: tColors.RED,
                title: "There was a connection error!",
                description: `\`${err}\``
            }

            await m.reply({
                embeds: [embed]
            });
            
            return;
        }

        const track = await player.search(query, {
            requestedBy: m.user
        });

        if (!track) {
            const embed = {
                color: tColors.RED,
                author: {
                    name: "Play"
                },
                title: query,
                description: "There were no search results!"
            }

            await m.reply({
                embeds: [embed]
            })

            return;
        }

        let embed;
        if (!track.playlist) {
            await queue.addTrack(track.tracks[0]);

            embed = {
                color: tColors.PURPLE,
                author: {
                    name: "Playing"
                },
                title: track.title,
                url: track.url,
                thumbnail: {
                    url: track.thumbnail
                },
                description: `by ${track.author}\n**${queue.createProgressBar()}**`,
            };
        } else {
            await queue.addTracks(track.tracks);
            
            embed = {
                color: tColors.PURPLE,
                author: {
                    name: "Playing"
                },
                title: track.playlist.title,
                url: track.playlist.url,
                thumbnail: {
                    url: track.playlist.thumbnail
                },
                description: track.playlist.description,
                fields: [
                    {
                        name: "\u200b",
                        value: "\u200b"
                    }
                ]
            }
        }

        if (!queue.playing) {
            await queue.play();
        } else {
            await m.reply({
                embeds: [embed]
            });
        }
    }
}
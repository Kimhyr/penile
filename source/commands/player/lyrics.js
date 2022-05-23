const player = require("../../handlers/player");
const genius = require("genius-lyrics");

const tColors = require("../../tools/tColors");

module.exports = {
    name: "lyrics",

    async execute(c, m, a) {
        const gClient = new genius.Client();

        let query;
        const queue = player.getQueue(m.guild);
        if (queue) {
            if (queue.playing) {
                query = `${queue.nowPlaying().title} by ${queue.nowPlaying().author}`;
            }
        } else if (a[0]) {
            query = a[0].join(" ");
        } else {
            const embed = {
                color: tColors.RED,
                title: "Provide a query!",
                description: "`lyrics {nowPlaying/query}`"
            }

            await m.reply({
                embeds: [embed]
            });

            return;
        }

        let searches;
        try {
            searches = await gClient.songs.search(query);
        } catch (err) {
            const embed = {
                color: tColors.RED,
                title: "There were no search results!"
            }

            await m.reply({
                embeds: [embed]
            });

            return;
        }

        const lyrics = await searches[0].lyrics();

        const embed = {
            color: tColors.PURPLE,
            author: {
                name: "Lyrics"
            },
            title: searches[0].title,
            url: searches[0].url,
            thumbnail: {
                url: searches[0].thumbnail
            },
            description: `by ${searches[0].artist.name}
            
                    **Lyrics**
                    ${lyrics.length > 4000 
                ? lyrics
                    .substring(0, 4000)
                    .replace(/\[/g, "**[")
                    .replace(/]/g, "]**") 
                : lyrics
                    .replace(/\[/g, "**[")
                    .replace(/]/g, "]**")}`
        }

        await m.reply({
            embeds: [embed]
        });
    }
}
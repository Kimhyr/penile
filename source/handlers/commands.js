const djs = require("discord.js");
const fs = require("fs");
const config = require("./../config.json");

module.exports = {
    async execute(c) {
        c.commands = new djs.Collection();

        console.log("\nCommands:");
        fs.readdirSync("./source/commands/")
            .forEach(dir => {
                const commands = fs.readdirSync(`./source/commands/${dir}`)
                    .filter(file => file.endsWith(".js"));
                
                console.log(`\n./${dir}`);
                for (let file of commands) {
                    try {
                        let command = require(`./../commands/${dir}/${file}`);

                        if (command.name) {
                            c.commands.set(command.name, command);

                            console.log(`✓ | ${command.name}`);
                        }
                    } catch (err) {
                        console.log(`✗ | ${file}\n${err}`);
                    }
                }
            });

        c.on("message", async m => {
            if (m.author.bot 
                || !m.guild 
                || !m.content.startsWith(config.prefix)) {
                return;
            }
            
            if (!m.member) {
                m.member = m.guild.members.fetch(m);
            }

            const a = m.content
                .split(" ");
            const ctx = a
                .shift()
                .slice(config.prefix.length)
                .trim();
            let cmd = c.commands.get(ctx);

            try {
                await cmd.execute(c, m, a);
                console.log(`✓ | <@${m.member.id}> | ${m.content}`);
            } catch (err) {
                console.log(`✗ | <@${m.member.id}> | ${m.content}\n\`${err}\``);
            }
        });
    }
}
const fs = require("fs");

module.exports = {
    async execute(c) {
        console.log("\nEvents:");
        fs.readdirSync("./source/events/").forEach(dir => {
            const events = fs.readdirSync(`./source/events/${dir}`).filter(file => file.endsWith(".js"));

            console.log(`\n./${dir}`);
            for (let file of events) {
                try {
                    let event = require(`./../events/${dir}/${file}`);

                    if (event.once) {
                        c.once(event.type, async (...a) => {
                            await event.execute(c, ...a);
                        });

                        console.log(`✓ | ${event.name}`);
                    } else {
                        c.on(event.type, async (...a) => {
                            await event.execute(c, ...a);
                        });
                        
                        console.log(`✓ | ${event.name}`);
                    }
                } catch (err) {
                    console.log(`✗ | ${file}\n\`${err}\``);
                }
            }
        });
    }
}
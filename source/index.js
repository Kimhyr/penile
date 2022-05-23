const djs = require("discord.js")
const config = require("./config.json")

const commands = require("./handlers/commands")
const events = require("./handlers/events")

const c = new djs.Client({
    intents: new djs.Intents(32767)
})

module.exports = c;

c.once("ready", async () => {
    await commands.execute(c);
    await events.execute(c);

    console.log("\nDone!");
});

c.login(config.token);
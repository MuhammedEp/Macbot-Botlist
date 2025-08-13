const { AoiClient } = require("aoi.js")
const config = require("./config.js")
const client = new AoiClient(config.Bot)
const { Client, GatewayIntentBits } = require("discord.js");
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

require("./+/func.js")( client, config )
require("./+/client/ready.js")( client )
require("./+/client/status.js")( client, config )
require("./+/variables.js")( client, config )

client.loadCommands("./commands", false)


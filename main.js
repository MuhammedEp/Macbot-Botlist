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

// HATA LOG
client.functionErrorCommand({
  channel: "1101883444386078780",
  code: `
$author[$guildName sunucusundan bir hata tespit edildi;$guildIcon]
$addField[Sunucu ID:;$guildID]
$addField[Sunucu Sahibi:;$username[$guildOwnerID] ($guildOwnerID)]
$addField[Fonksiyon:;$handleError[function]]
$addField[Komut:;$handleError[command]]
$description[$handleError[error]]
$color[#2ec6a5]
$addTimestamp
$error 
$addButton[1; ;secondary;silbtn_858951074164244490;false;<:sil:1211313477134848010>]
   `,
});



module.exports = {
    Bot: {
        token: "TOKEN",
        prefix: "!",
  intents: ["MessageContent","Guilds","GuildMembers","GuildBans","GuildEmojisAndStickers","GuildIntegrations","GuildWebhooks","GuildInvites","GuildVoiceStates","GuildPresences","GuildMessages","GuildMessageReactions","GuildMessageTyping"],
  events: ["onApplicationCommandPermissionsUpdate","onMessage","onMessageDelete","onMessageUpdate","onMessageDeleteBulk","onJoin","onLeave","onGuildUpdate","onGuildUnavailable","onBanAdd","onBanRemove","onVoiceStateUpdate","onInteractionCreate","onUserUpdate","onFunctionError",],
  guildOnly: true,
  respondToBots: false,
  suppressAllErrors: true,
  database: {
        type: "aoi.db",
        db: require("@aoijs/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
}}

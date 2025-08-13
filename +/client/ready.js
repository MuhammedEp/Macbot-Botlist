module.exports = ( client, config ) => {
    client.readyCommand({
  channel: "",
  code: `$log[
╭────────| MACBOT BOTLİST |───────╮
• Server Count [ $guildCount ]
• Member Count [ $numberSeparator[$allMembersCount;.] ]
• Command Count [ $commandsCount ]
• Variable Count [ $variablesCount ]
• Aoi.js Version [ v$packageVersion ]
• Node.js Version [ $nodeVersion ]
╰──────────────────────────────────╯]
`
})
}
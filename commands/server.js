module.exports = [
    {
        name:"sunucu",
        aliases:["sb"],
        code:`
$sendMessage[
{newEmbed:
{author:$guildName:$guildIcon}
{footer:$userDisplayName:$userAvatar}
{thumbnail:$guildIcon}
{color:$userRoleColor[$clientID]}
{timestamp}
{field:Sunucu Adı#COLON#:$guildName}
{field:Sunucu ID#COLON#:$guildID}
{field:Geliştirici Rolü#COLON#:<@&$getGuildVar[devrol]>}
{field:Bot Rolü#COLON#:<@&$getGuildVar[botrol]>}
{field:Ekli Bot Sayısı#COLON#:$wordCount[$replaceText[$bots;,; ]]}}{reply:$messageID:false}{allowedMentions:}]
`
        }]
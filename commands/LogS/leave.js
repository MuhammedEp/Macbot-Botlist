module.exports = [{
    type:"leave",
    channel:"$getGuildVar[botlog]",
    $if:"old",
    code: `
$if[$isBot[$authorID]==false]
$if[$isNumber[$advancedTextSplit[$dbGet[$guildID.$authorID;botlist];,;1]]==true]
$if[$channelExists[$getGuildVar[botlog]]==true]

$textSplitMap[botat]
$textSplit[$dbGet[$guildID.$authorID;botlist];,]
$endif
$endif
$else
$if[$isNumber[$getUserVar[botowner;$authorID]]==true]
$dbPull[$guildID.$getUserVar[botowner;$authorID];$authorID;botlist]
$endif
$endif
    `
},
{
    name:"botat",
    type:"awaited",
    $if:"old",
    code:`
$if[$memberExists[$message[1]]==true]
$kick[$guildID;$message[1];Bot sahibi sunucudan ayrıldı]
$channelSendMessage[$getGuildVar[botlog];{newEmbed:{description:**$userDisplayName[$getUserVar[botowner;$message[1]]]** sunucudan ayrıldığı için **$username[$message[1]]** sunucudan atıldı.}{color:Red}{thumbnail:$userAvatar[$message[1]]}
{footer:ID#COLON# $getUserVar[botowner;$message[1]]:$userAvatar[$getUserVar[botowner;$message[1]]]}}{timestamp}]
$else
$dbPull[$guildID.$getUserVar[botowner;$message[1]];$message[1];botlist]
$endif
$wait[1s]
    `
    }]
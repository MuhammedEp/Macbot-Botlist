module.exports = {
    type:"join",
    channel:"$getGuildVar[botlog]",
    $if:"old",
    code: `
$if[$isBot[$authorID]==true]
$if[$checkContains[$dbGet[$guildID;sira];$authorID]==true]

$if[$roleExists[$getGuildVar[botrol]]==true]
$giveRole[$guildID;$authorID;$getGuildVar[botrol];Botlist bot rolü]
$endif

$if[$memberExists[$getUserVar[botowner;$authorID]]==true]
$if[$roleExists[$getGuildVar[devrol]]==true]
$giveRole[$guildID;$getUserVar[botowner;$authorID];$getGuildVar[devrol];Botlist Geliştirici Rolü]
$endif
$else
$kick[$guildID;$authorID;Bot sahibi sunucuda bulunamadı]
$channelSendMessage[$getGuildVar[botlog];{newContainer:{text:Bot sahibi sunucuda bulunamadı bot atıldı.($username)}{color:Red}}
{reply:$channelLastMessageID:false}]
$dbPull[$guildID.$getUserVar[botowner;$authorID];$authorID;botlist]
$endif
$wait[1s]
$dbPush[$guildID.$getUserVar[botowner;$authorID];$authorID;botlist]
$dbPull[$guildID;$authorID;sira]
$deleteMessage[$getUserVar[msgid;$authorID];$getGuildVar[botlog]]
$channelSendMessage[$getGuildVar[botlog];<@$getUserVar[botowner;$authorID]>{newEmbed:
{author:Bot sunucuya eklendi}
{thumbnail:$userAvatar}
{field:Bot#COLON#:$username[$authorID]}
{field:Bot ID#COLON#:$authorID}
{footer:$userDisplayName[$get[id]] tarafından eklendi:$userAvatar[$get[id]]}
{color:Green}
}]
$endif
$endif

$let[id;$getAuditLogs[$guildID;;1;28;{executor.id}]]
$onlyIf[$channelExists[$getGuildVar[botlog]]==true;]
    `
    }
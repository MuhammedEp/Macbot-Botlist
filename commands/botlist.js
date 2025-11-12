module.exports = [{
    name:"botlist",
    aliases:["bl"],
    code:`
$reply[$messageID;false]
$author[$memberDisplayName[$guildID;$clientID];$userAvatar[$clientID]]
$footer[$userDisplayName;$userAvatar]
$addTimeStamp
$color[$userRoleColor[$clientID]]
$description[
> **__Botlist komutları:__**
?botlist (?bl): \`Botlist komutlar bilgisi.\`
?botlist-ayar (?bla): \`Botlist ayarları kurulumu.\`
?botlist-kur (?blk): \`Botlist bot ekleme mesajını atar.\`
?botlist-sıra (?bls): \`Botlist bot sırası.\`
?botlarım (?botlar): \`Sunucuda ekli olan botlarınız.\`
]
    `
},
  {
      name:"botlist-sıra",
      aliases:["bls"],
      code:`
$textSplitMap[botlistsira]
$textSplit[$dbGet[$guildID;sira];,]
$onlyIf[$dbGet[$guildID;sira]!=;{newContainer:{text:Sırada bot yok}{color:Green}}{deleteIn:10s} {reply:$messageID:false}]
      `
 },
   {
       name:"botlistsira",
       type:"awaited",
       code:`
$indexOfArg[$dbGet[$guildID;sira];$message[1]]. $userDisplayName[$message[1]] ($message[1])
`
       },
 {
     name:"botlarım",
     aliases:["botlar"],
     code:`
$reply[$messageID;false]
$author[$userDisplayName[$get[user]] Botları;$userAvatar[$get[user]]]
$color[$userRoleColor[$get[user]]]
$footer[$userDisplayName;$userAvatar]
$thumbnail[$guildIcon]
$description[<@$replaceText[$dbGet[$guildID.$get[user];botlist];,;>
<@]>]
$onlyIf[$isNumber[$advancedTextSplit[$dbGet[$guildID.$findMember[$message[1]];botlist];,;1]]==true;{newContainer:{text:❌ **$userDisplayName[$findMember[$message[1]]]** hiç bot eklememiş.}{color:Red}}{deleteIn:10s}{reply:$messageID:false}]
$let[user;$findMember[$message[1]]]
`
     }
]

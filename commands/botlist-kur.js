module.exports = [{
    name:"blkur",
    aliases:["botlist-kur","blk"],
    code:`

$description[
🇹🇷 Merhaba, bu kanaldan botunu ekleyebilirsin. Botunu eklemek için aşağıdaki butona tıkla ve önüne açılan formu doldur. Herhangi bir sorunda yetkililere ulaşmayı unutma.

🇬🇧 Hello, you can add your bot from this channel. To add your bot, click the button below and fill out the form that opens. Don't forget to contact the authorities with any problems.

🇩🇪 Hallo, Sie können Ihren Bot über diesen Kanal hinzufügen. Klicken Sie auf die Schaltfläche unten und füllen Sie das Formular aus. Bei Fragen wenden Sie sich bitte an die Mitarbeiter.]
$color[$userRoleColor[$clientID]]
$author[$guildName;$guildIcon]
$footer[$userDisplayName[$clientID];$userAvatar[$clientID]]
$addButton[1;;secondary;botekle;false;<:eklendi:1214607069588488254>]
$onlyPerms[administrator;]
    `
    },
{
    name:"botekle",
    type:"interaction",
    prototype:"button",
    code:`
$interactionModal[Add Bot;boteklemodal;
{actionRow:
{textInput:Bot ID:1:botid:true:Your bot's ID:18:22}}
{actionRow:
{textInput:Bot Prefix:1:botprefix:true:Your Bot's Prefix:1:6}
  }
  ]
$onlyIf[$memberExists[$authorID;$dbGet[botlist.macbotswid;data]]==true; 
🇹🇷 Bot eklemek için aşağı linkteki sunucuda olmanız gerekir.Çıkanın botu atılacaktır.

🇬🇧 To add a bot, you must be on the server linked below. Anyone who leaves will have their bot removed.

🇩🇪 Um einen Bot hinzuzufügen, musst du dich auf dem unten verlinkten Server befinden. Jeder, der den Server verlässt, verliert seinen Bot.

$dbGet[botlist.macbotswlink;data]
{ephemeral}{interaction}]
$onlyIf[$channelExists[$getGuildVar[botlog]]==true;
🇹🇷 Bot Log kanalı ayarlı değil.
🇬🇧 Bot Log channel is not set.
🇩🇪 Bot-Log-Kanal ist nicht festgelegt.
{ephemeral}{interaction}]
$wait[1s]
    `
    },
{
    name:"boteklemodal",
    type:"interaction",
    prototype:"modal",
    code:`
$setUserVar[botowner;$authorID;$textInputValue[botid]]
$setUserVar[msgid;$get[msgid];$textInputValue[botid]]
$dbPush[$guildID;$textInputValue[botid];sira]
$let[msgid;$channelSendMessage[$getGuildVar[botlog];{newEmbed:
{author:Yeni bir bot sıraya eklendi}
{thumbnail:https#COLON#//cdn.discordapp.com/avatars/$get[id]/$fetch[user;$get[id];avatar].png}
{color:White}
{field:Bot Adı#COLON#:$fetch[user;$get[id];username]}
{field:Bot ID#COLON#:$get[id]}
{field:Bot Prefix#COLON#:$textInputValue[botprefix]}
{field:Başvuru Yapan#COLON#:$userDisplayName}
{field:Başvuru Yapan ID#COLON#:$authorID}}
{actionRow:
{button:Botu Onayla:success:botonayla}
{button:Botu Reddet:danger:botreddet}
{button:Botu Ekle:link:https#COLON#//discord.com/api/oauth2/authorize?client_id=$textInputValue[botid]&scope=bot+applications.commands}};true]]
$interactionReply[
🇹🇷 Bot sıraya eklendi
🇬🇧 Bot added to queue
🇩🇪 Bot zur Warteschlange hinzugefügt
;everyone;true]
$let[id;$textInputValue[botid]]
$onlyIf[$checkContains[$dbFetch[$guildID;sira];$textInputValue[botid]]==false;🇹🇷 Bot zaten sırada
🇬🇧 The bot is already in the queue
🇩🇪 Der Bot ist bereits in der Warteschlange 
{ephemeral}{interaction}]
$onlyIf[$memberExists[$textInputValue[botid]]==false;
🇹🇷 Bot zaten sunucuda bulunuyor
🇬🇧 The bot is already on the server
🇩🇪 Der Bot ist bereits auf dem Server {ephemeral}{interaction}]
$onlyIf[$isBot[$textInputValue[botid]]==true;
🇹🇷 Bu ID bir bota ait değil
🇬🇧 This ID does not belong to a bot
🇩🇪 Diese ID gehört keinem Bot {ephemeral}{interaction}]
    `
},
  {
      name:"botonayla",
      type:"interaction",
      prototype:"button",
      $if:"old",
      code:`
$if[$roleExists[$getGuildVar[botrol]]==true]
$giveRole[$guildID;$get[id];$getGuildVar[botrol];Botlist - Bot Rolü]
$endif

$if[$memberExists[$get[oid]]==true]
$if[$roleExists[$getGuildVar[devrol]]==true]
$giveRole[$guildID;$get[oid];$getGuildVar[devrol];Botlist - Geliştirici Rolü]
$endif
$dbPush[$guildID.$get[oid];$get[id];botlist]
$dbPull[$guildID;$get[id];sira]
$deleteMessage[$getUserVar[msgid;$get[id]];$getGuildVar[botlog]]
$channelSendMessage[$getGuildVar[botlog];<@$get[oid]>
{newEmbed:
{author:Bot manuel olarak onaylandı}
{thumbnail:$userAvatar[$get[id]]}
{color:Green}
{field:Bot#COLON#:$username[$get[id]]}
{field:Bot ID#COLON#:$get[id]}
{footer:$userDisplayName tarafından onaylandı:$userAvatar}
}]

$else
$dbPull[$guildID.$get[oid];$get[id];botlist]
$kick[$guildID;$get[id];Bot sahibi sunucuda bulunamadı]
$deleteMessage[$getUserVar[msgid;$get[id]];$getGuildVar[botlog]]
$channelSendMessage[$getGuildVar[botlog];{newContainer:{text:Bot sahibi sunucuda olmadığı için sunucuda olan bot atıldı.}
{text:**Bot**#COLON# $username[$get[id]] ($get[id])
**Sahibi**#COLON# $userDisplayName[$get[oid]] ($get[oid])}{color:Red}}
]

$endif
$onlyIf[$memberExists[$get[id]]==true;**$username[$get[id]]** sunucuda bulunamadı.{ephemeral}{interaction}]

$let[oid;$getEmbed[$channelID;$messageID;1;field5.value]]
$let[id;$getEmbed[$channelID;$messageID;1;field2.value]]
$onlyPerms[manageguild;Onaylamak için **Sunucuyu Yönet** iznin olması lazım
 {ephemeral}{interaction}]
 `
      },
  {
      name:"botreddet",
      type:"interaction",
      prototype:"button",
      code:`
$interactionModal[Botu Reddet;botredmodal_$get[id]_$getEmbed[$channelID;$messageID;1;field5.value];
{actionRow:
{textInput:Red Sebebi:2:sbp:true:Reason:3:200}}
]
$let[id;$getEmbed[$channelID;$messageID;1;field2.value]]
 $onlyPerms[manageguild;Reddetmek için **Sunucuyu Yönet** iznin olması lazım
 {ephemeral}{interaction}]
 `
      },
 {
     type:"interaction",
     prototype:"modal",
     code:`
$dbPull[$guildID;$get[id];sira]
$deleteMessage[$getUserVar[msgid;$get[id]];$getGuildVar[botlog]]

$channelSendMessage[$getGuildVar[botlog];<@$get[oid]>
{newEmbed:
{author:Bot reddedildi}
{thumbnail:$userAvatar[$get[id]]}
{color:Red}
{field:Bot#COLON#:$userDisplayName[$get[id]]}
{field:Bot ID#COLON#:$get[id]}
{field:Sebep#COLON#:$textInputValue[sbp]}
{footer:$userDisplayName tarafından reddedildi:$userAvatar}
}]
$wait[1s]
$interactionUpdate[Bot reddedildi]
$let[oid;$advancedTextSplit[$interactionData[customId];_;3]]
$let[id;$advancedTextSplit[$interactionData[customId];_;2]]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botredmodal;]
`
}]
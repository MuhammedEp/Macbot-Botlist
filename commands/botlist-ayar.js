module.exports = [{
  name:"bl-ayar",
  aliases:["botlist-ayar","blayar","bla"],
  $if:"old",
  code:`
$if[$messageExists[$get[msgid]]==true]
$editMessage[$get[msgid];{newContainer:
{text:**Menünün kullanım süresi doldu**}
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}
{text:**Bot Log Kanalı#COLON#**
📒 $advancedReplaceText[$channelExists[$getGuildVar[botlog]];true;<#$getGuildVar[botlog]>;false;Ayarlanmadı]}
{separator:true}
{text:**Bot Rolü#COLON#**
🤖 $advancedReplaceText[$roleExists[$getGuildVar[botrol]];true;<@&$getGuildVar[botrol]>;false;Ayarlanmadı]}
{separator:true}
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $advancedReplaceText[$roleExists[$getGuildVar[devrol]];true;<@&$getGuildVar[devrol]>;false;Ayarlanmadı]}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}
}]
$endif
$wait[120s]

$let[msgid;$sendMessage[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}
{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 $advancedReplaceText[$channelExists[$getGuildVar[botlog]];true;<#$getGuildVar[botlog]>;false;Ayarlanmadı]}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 $advancedReplaceText[$roleExists[$getGuildVar[botrol]];true;<@&$getGuildVar[botrol]>;false;Ayarlanmadı]}{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $advancedReplaceText[$roleExists[$getGuildVar[devrol]];true;<@&$getGuildVar[devrol]>;false;Ayarlanmadı]}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}{reply:$messageID:false}
;true]]

$disableMentionType[all]
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.{deleteIn:10s}]
`
 },
    { // BOT LOG SEÇ
        type:"interaction",
        prototype:"selectMenu",
        code:`
$setGuildVar[botlog;$interactionData[values[0]]]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 <#$interactionData[values[0]]>}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 $if[$roleExists[$getGuildVar[botrol]]==true;<@&$getGuildVar[botrol]>;Ayarlanmadı]}
{button:Sil:danger:botrolsil_$authorID:false}}

{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $if[$roleExists[$getGuildVar[devrol]]==true;<@&$getGuildVar[devrol]>;Ayarlanmadı]}
{button:Sil:danger:devrolsil_$authorID:false}}{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}{allowedMentions:}}
]

$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;📒 Bu menüyü sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botlogsec;]

    `
 },
    { // BOT ROL SEÇ 
        type:"interaction",
        prototype:"selectMenu",
        $if:"old",
        code:`
$setGuildVar[botrol;$interactionData[values[0]]]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$getRoleColor[$interactionData[values[0]]]}
{separator:true}{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 $advancedReplaceText[$channelExists[$getGuildVar[botlog]];true;<#$getGuildVar[botlog]>;false;Ayarlanmadı]}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 <@&$interactionData[values[0]]>}
{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $advancedReplaceText[$roleExists[$getGuildVar[devrol]];true;<@&$getGuildVar[devrol]>;false;Ayarlanmadı]}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}
]
$onlyIf[$rolePosition[$userHighestRole[$clientID]]!=$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, benim en yüksek rolüme eşit.Bu yüzden bu rolü veremem.}{color:Red}}{interaction}{ephemeral}]
   $onlyIf[$rolePosition[$userHighestRole[$clientID]]<$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, benim en yüksek rolümden yüksek.Bu yüzden bu rolü veremem.}{color:Red}}{interaction}{ephemeral}] 

$if[$authorID!=$guildOwnerID]
$onlyIf[$rolePosition[$userHighestRole]!=$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, senin en yüksek rolüne eşit.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]

$onlyIf[$rolePosition[$userHighestRole]<$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, senin en yüksek rolünden yüksek.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]
$endif

$onlyIf[$checkContains[$rolePerms[$interactionData[values[0]];, ;$guildID];administrator]==false;{newEmbed:{description:❌ Bu rolde **Yönetici** izni var.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]

$onlyIf[$isRoleManaged[$interactionData[values[0]]]==false;{newEmbed:{description:❌ Bu rol discord tarafından yönetiliyor bunu kullanamazsın.}{color:Red}}{interaction}{ephemeral}]
   
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;🤖 Bu menüyü sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botrolsec;]
`
},{ // DEVELOPER ROL SEÇ
        type:"interaction",
        prototype:"selectMenu",
        $if:"old",
        code:`
$setGuildVar[devrol;$interactionData[values[0]]]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$getRoleColor[$interactionData[values[0]]]}
{separator:true}{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 $advancedReplaceText[$channelExists[$getGuildVar[botlog]];true;<#$getGuildVar[botlog]>;false;Ayarlanmadı]}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 $advancedReplaceText[$roleExists[$getGuildVar[botrol]];true;<@&$getGuildVar[botrol]>;false;Ayarlanmadı]}
{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 <@&$interactionData[values[0]]>}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}
]

$onlyIf[$rolePosition[$userHighestRole[$clientID]]!=$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, benim en yüksek rolüme eşit.Bu yüzden bu rolü veremem.}{color:Red}}{interaction}{ephemeral}]
   $onlyIf[$rolePosition[$userHighestRole[$clientID]]<$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, benim en yüksek rolümden yüksek.Bu yüzden bu rolü veremem.}{color:Red}}{interaction}{ephemeral}] 

$if[$authorID!=$guildOwnerID]
$onlyIf[$rolePosition[$userHighestRole]!=$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, senin en yüksek rolüne eşit.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]

$onlyIf[$rolePosition[$userHighestRole]<$rolePosition[$interactionData[values[0]]];{newEmbed:{description:❌ Bu rol, senin en yüksek rolünden yüksek.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]
$endif

$onlyIf[$checkContains[$rolePerms[$interactionData[values[0]];, ;$guildID];administrator]==false;{newEmbed:{description:❌ Bu rolde **Yönetici** izni var.Bu yüzden bu rolü seçemezsin.}{color:Red}}{interaction}{ephemeral}]

$onlyIf[$isRoleManaged[$interactionData[values[0]]]==false;{newEmbed:{description:❌ Bu rol discord tarafından yönetiliyor bunu kullanamazsın.}{color:Red}}{interaction}{ephemeral}]
   
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;👨‍💻 Bu menüyü sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==devrolsec;]
`
},
  { // BOT LOG SİL
      type:"interaction",
      prototype:"button",
      code:`
$deleteVar[botlog;$guildID]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}
{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 < Silindi >}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 $if[$roleExists[$getGuildVar[botrol]]==true;<@&$getGuildVar[botrol]>;Ayarlanmadı]}{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $if[$roleExists[$getGuildVar[devrol]]==true;<@&$getGuildVar[devrol]>;Ayarlanmadı]}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}]
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;❌ Bu butonu sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botlogsil;]

`
},
  { // BOT ROL SİL
      type:"interaction",
      prototype:"button",
      code:`
$deleteVar[botrol;$guildID]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}
{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 $if[$channelExists[$getGuildVar[botlog]]==true;<#$getGuildVar[botlog]>;Ayarlanmadı]}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 < Silindi >}{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 $if[$roleExists[$getGuildVar[devrol]]==true;<@&$getGuildVar[devrol]>;Ayarlanmadı]}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}]
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;❌ Bu butonu sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botrolsil;]

`
},
  { // DEVELOPER ROL SİL
      type:"interaction",
      prototype:"button",
      code:`
$deleteVar[devrol;$guildID]
$interactionUpdate[{newContainer:
{newSection:
{text:## $guildName - Botlist Ayarları}
{thumbnail:$guildIcon}}
{color:$userRoleColor[$clientID]}
{separator:true}
{newSection:
{text:**Bot Log Kanalı#COLON#**
📒 $if[$channelExists[$getGuildVar[botlog]]==true;<#$getGuildVar[botlog]>;Ayarlanmadı]}
{button:Sil:danger:botlogsil_$authorID:false}}
{actionRow:
{selectMenu:botlogsec_$authorID:📒 • Bot Log Kanalı Seç:1:1:false:{channelInput:text}}}
{separator:true}{newSection:
{text:**Bot Rolü#COLON#**
🤖 $if[$roleExists[$getGuildVar[botrol]]==true;<@&$getGuildVar[botrol]>;Ayarlanmadı]}{button:Sil:danger:botrolsil_$authorID:false}}
{actionRow:
{selectMenu:botrolsec_$authorID:🤖 • Bot Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Geliştirici Rolü#COLON#**
👨‍💻 < Silindi >}
{button:Sil:danger:devrolsil_$authorID:false}}
{actionRow:
{selectMenu:devrolsec_$authorID:👨‍💻 • Geliştirici Rolü Seç:1:1:false:{roleInput}}}
{separator:true}{newSection:
{text:**Yetkili#COLON#**
$userDisplayName - ( $authorID )}{thumbnail:$userAvatar}}
{allowedMentions:}}]
$onlyPerms[administrator;Bu komut için **\`Yönetici\`** izni lazım.
{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;❌ Bu butonu sadece <@$advancedTextSplit[$interactionData[customId];_;2]> kullanabilir.{ephemeral}{interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==devrolsil;]

`
}]
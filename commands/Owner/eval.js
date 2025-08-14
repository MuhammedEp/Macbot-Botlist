module.exports = [{
   name:"eval", // Komut testi
   code:`
   $eval[$message]
   $onlyForIDs[<ID>;Bu komut sahibime özel]
   `
   },
     {
         name:"if", // Aoi.js if old hızlı kullanımı 
         $if:"old",
         code:`
         $eval[$message]
   $onlyForIDs[<ID>;]
         `
},
  {
      name:"djs", // D.JS ile komut testi
      code:`
\`\`\`js
$djsEval[$message;true]
\`\`\`
$onlyForIDs[<ID>;]
      `
      }]

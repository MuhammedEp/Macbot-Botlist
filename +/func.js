module.exports = ( client, config ) => {
const { JsonProvider } = require("ervel.db");

const veriler = new JsonProvider({ path: "./jsons/data.json" });
const sira = new JsonProvider({ path: "./jsons/botlist-sira.json" });
const botlist = new JsonProvider({ path: "./jsons/botlist.json" });

client.functionManager.createFunction({
    name: "$dbSet",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key, value, tableName] = data.inside.splits;
      let table;
if (tableName === 'data') {
  table = veriler;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
      table.set(key,value);
      return {
        code: d.util.setCode(data),
        };
    },
  });

client.functionManager.createFunction({
    name: "$dbGet",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key, tableName] = data.inside.splits;
     let table;
if (tableName === 'data') {
  table = veriler;
} else if (tableName === 'sira') {
  table = sira;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
  
   data.result = await table.get(key);
      return {
        code: d.util.setCode(data),
      };
    },
  });

client.functionManager.createFunction({
    name: "$dbFetch",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key, tableName] = data.inside.splits;
      let table;
if (tableName === 'data') {
  table = veriler;
} else if (tableName === 'sira') {
  table = sira;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
 data.result = await table.fetch(key);
      return {
        code: d.util.setCode(data),
        };
    },
  });

client.functionManager.createFunction({
    name: "$dbDelete",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key,tableName] = data.inside.splits;
        let table;
if (tableName === 'sira') {
  table = sira;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
     table.delete(key) ;
      return {
        code: d.util.setCode(data),
      };
    },
  });

 client.functionManager.createFunction({
    name: "$dbPush",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key, value, tableName] = data.inside.splits;
      let table;
if (tableName === 'sira') {
  table = sira;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
      table.push(key,value);
      return {
        code: d.util.setCode(data),
        };
    },
  });

client.functionManager.createFunction({
    name: "$dbPull",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key, value, tableName] = data.inside.splits;
      let table;
if (tableName === 'sira') {
  table = sira;
} else if (tableName === 'botlist') {
  table = botlist;
} else {
  console.log("Geçersiz tablo adı");
}
      table.pull(key,value);
      return {
        code: d.util.setCode(data),
        };
    },
  });

client.functionManager.createFunction({
    name: "$dbHas",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [key] = data.inside.splits;
 data.result = await botlist.has(key);
      return {
        code: d.util.setCode(data),
        };
    },
  });

client.functionManager.createFunction({
    name: "$dbSW",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [arananPrefix] = data.inside.splits; // Kullanıcının girdiği prefix (örn: "1234")
      
      try {
        // 1. Tüm veritabanını çek
        const tumVeri = await botlist.fetchAll();
        
        // 2. Eşleşen value'ları topla
        const bulunanDegerler = [];
        
        for (const [key, value] of Object.entries(tumVeri)) {
          if (key.startsWith(arananPrefix)) {
            if (Array.isArray(value)) {
              bulunanDegerler.push(...value);
            } else {
              bulunanDegerler.push(value);
            }
          }
        }
        
        data.result = bulunanDegerler.length > 0 
          ? bulunanDegerler.join(", ") 
          : "Eşleşen veri bulunamadı.";
          
      } catch (err) {
        data.result = "Veritabanı hatası!";
      }
      
      return {
        code: d.util.setCode(data),
      };
    }
});
    
client.functionManager.createFunction({
  name: "$bots",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [guildId = d.guild?.id] = data.inside.splits;

    const botsData = await botlist.get(guildId);

    data.result = botsData ? Object.values(botsData).flat().join(",") : "";

    return {
      code: d.util.setCode(data),
    };
  },
});
    
client.functionManager.createFunction({
  name: "$wordCount",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [text = "", find = ""] = data.inside.splits;

    const cleaned = text.trim().toLowerCase();

    if (find) {
      const target = find.trim().toLowerCase();
      const regex = new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
      const matches = cleaned.match(regex);
      data.result = matches ? matches.length : 0;
    } else {
      data.result = cleaned.split(/\s+/).filter(Boolean).length;
    }

    return {
      code: d.util.setCode(data),
    };
  },
});
    
    
}
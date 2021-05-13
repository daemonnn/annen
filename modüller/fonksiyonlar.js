const Discord = require('discord.js');
const db = require("quick.db");
const fs = require("fs");
module.exports = (client, clientt, message) => {

client.panel = {};

    client.customCmds = (id, cmd) => {
    
    let komut = cmd['komut']
    let aciklama = cmd['aciklama']
    
    var array = []
	  var kontrol2 = []

      let komutlar = client.cmdd
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol2.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  client.panel = {};

    client.customCmds2 = (id, cmdd1) => {
    
    let komut = cmdd1['komut']
    let aciklama = cmdd1['aciklama']
    
    var array = []
	  var kontrol3 = []
    let komutlar = client.cmdd1
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol3.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol3.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  //////////////////////////////////////////////
  client.panel = {};

    client.customCmds = (id, cmd) => {
    
    let komut = cmd['komut']
    let aciklama = cmd['aciklama']
    
    var array = []
	  var kontrol2 = []

      let komutlar = client.cmdd
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol2.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  client.panel = {};

    client.customCmds3 = (id, cmdd2) => {
    
    let filtre = cmdd2['filtre']
    
    var array = []
	  var kontrol3 = []
    let filtreler = client.cmdd2
    
    if(filtreler[id]) {
		for (var i = 0; i < Object.keys(filtreler[id]).length; i++) {
			if(filtre === Object.keys(filtreler[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(filtreler[id][i])[0]}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(filtreler[id][i])[0]}": "${filtreler[id][i][Object.keys(filtreler[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol3.push(Object.keys(filtreler[id][i])[0].toString())
		}
		if(!kontrol3.includes(filtre)) {
			array.push(JSON.parse(`{"${filtre}"}`))
			filtreler[id] = array

			fs.writeFile("./filtre.json", JSON.stringify(filtre), (err) => {
				console.log(err)
			})

			return
		} else {
			filtreler[id] = array

			fs.writeFile("./filtre.json", JSON.stringify(filtre), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${filtre}"}`))
		filtreler[id] = array

		fs.writeFile("./filtre.json", JSON.stringify(filtre), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
client.panel.ayarlarKaydetKullanici = (kullaniciID, kullanici, yeniAyar, req, res) => {
if (yeniAyar['renk']) {
db.set(`${kullanici.id}.renk`, yeniAyar['renk'])
}

if (yeniAyar['resim']) {
db.set(`${kullanici.id}.resim`, yeniAyar['resim'])
}
};


    client.writeSettings = (id, newSettings) => {
    
    if (!client.guilds.cache.get(id)) return
    
    try {
      
      
         if (newSettings['kelimefiltre']) {
           if(db.fetch(`filtre_${id}`).includes(newSettings['kelimefiltre']) === true) {
        db.push(`filtre_${id}`, newSettings['kelimefiltre'])
           }
         
      }
      
     
         if (newSettings['kYasak']) {
        db.push(`yasakK_${id}`, newSettings['kYasak'])
         }
      
      
      
if (newSettings['küfürEngel'] === 'aktif') {
db.set(`küfürE_${id}`, newSettings['küfürEngel'])
}
if (!newSettings['küfürEngel']) {
db.delete(`küfürE_${id}`)
}
if (newSettings['spamEngel'] === 'aktif') {
db.set(`spamE_${id}`, newSettings['spamEngel'])
}
if (!newSettings['spamEngel']) {
db.delete(`spamE_${id}`)
}
if (newSettings['veris'] === 'aktif') {
db.set(`veris_${id}`, newSettings['veris'])
}
if (!newSettings['veris']) {
db.delete(`veris_${id}`)
}
if (newSettings['tkrEngel'] === 'aktif') {
db.set(`tkrE_${id}`, newSettings['tkrEngel'])
}
if (!newSettings['tkrEngel']) {
db.delete(`tkrE_${id}`)
}
if (newSettings['linkEngel'] === 'aktif') {
db.set(`linkE_${id}`, newSettings['linkEngel'])
}
if (!newSettings['linkEngel']) {
db.delete(`linkE_${id}`)
}
if (newSettings['capslockEngel'] === 'aktif') {
db.set(`capsE_${id}`, newSettings['capslockEngel'])
}
if (!newSettings['capslockEngel']) {
db.delete(`capsE_${id}`)
}
if (newSettings['ddosEngel'] === 'aktif') {
db.set(`ddosE_${id}`, newSettings['ddosEngel'])
}
if (!newSettings['ddosEngel']) {
db.delete(`ddosE_${id}`)
}
      
      if (newSettings['botknt'] === 'aktif') {
db.set(`botmu_${id}`, newSettings['botknt'])
}
if (!newSettings['botknt']) {
db.delete(`botmu_${id}`)
}
            if (newSettings['embedmi'] === 'aktif') {
db.set(`embedmi_${id}`, newSettings['embedmi'])
}
if (!newSettings['embedmi']) {
db.delete(`embedmi_${id}`)
}
            if (newSettings['bilgivre'] === 'aktif') {
db.set(`bilgivre_${id}`, newSettings['bilgivre'])
}
if (!newSettings['bilgivre']) {
db.delete(`bilgivre_${id}`)
}
if (newSettings['kanalEngel'] === 'aktif') {
db.set(`kanalE_${id}`, newSettings['kanalEngel'])
}
if (!newSettings['kanalEngel']) {
db.delete(`kanalE_${id}`)
}   
if (newSettings['rolEngel'] === 'aktif') {
db.set(`rolE_${id}`, newSettings['rolEngel'])
}
if (!newSettings['rolEngel']) {
db.delete(`rolE_${id}`)
}  
if (newSettings['emojiEngel'] === 'aktif') {
db.set(`emojiE_${id}`, newSettings['emojiEngel'])
}
if (!newSettings['emojiEngel']) {
db.delete(`emojiE_${id}`)
} 
if (newSettings['rightEngel'] === 'aktif') {
db.set(`rightE_${id}`, newSettings['rightEngel'])
}
if (!newSettings['rightEngel']) {
db.delete(`rightE_${id}`)
}  
      if (newSettings['yönteticiEngel'] === 'aktif') {
db.set(`yoneticiE_${id}`, newSettings['yönteticiEngel'])
}
if (!newSettings['yönteticiEngel']) {
db.delete(`yoneticiE_${id}`)
}  
if (newSettings['spamEngel'] === 'aktif') {
db.set(`emojiE_${id}`, newSettings['spamEngel'])
}
if (!newSettings['spamEngel']) {
db.delete(`spamE_${id}`)
}  
if (newSettings['otorol']) {
db.set(`otoR_${id}`, newSettings['otorol'])
}
      
if (newSettings['otoRK']) {
db.set(`otoRK_${id}`, newSettings['otoRK'])   
}
      if (newSettings['msjlog']) {
db.set(`msjlog_${id}`, newSettings['msjlog'])   
}
            if (newSettings['']) {
db.set(`msjlog_${id}`, newSettings['msjlog'])   
}
//////////
          if (newSettings['msjdlog']) {
db.set(`msjdlog_${id}`, newSettings['msjdlog'])   
}
            if (newSettings['']) {
db.set(`msjdlog_${id}`, newSettings['msjdlog'])   
}  
      //////////
           if (newSettings['bldrmsj']) {
db.set(`bldrmsj_${id}`, newSettings['bldrmsj'])   
}
           if (newSettings['bldrmsj']) {
db.set(`bldrmsj1_${id}`, newSettings['bldrmsj'])   
}
           if (newSettings['ypyknl']) {
             const client2 = new Discord.Client();
db.set(`ypyknl_${id}`, newSettings['ypyknl'])
           }
                 if (newSettings['renk']) {
db.set(`renk_${id}`, newSettings['renk'])   
}
                 if (newSettings['renk2']) {
db.set(`renk2_${id}`, newSettings['renk2'])   
}
 if (newSettings['otoTag']) {
db.set(`tagB_${id}`, newSettings['otoTag'])   
}
if (newSettings['otoTagK']) {
db.set(`tagKanal_${id}`, newSettings['otoTagK'])
}
 if (newSettings['prefix']) {
db.set(`prefix_${id}`, newSettings['prefix'])
}
 if (newSettings['fake']) {
db.set(`fake_${id}`, newSettings['fake'])
}
if (newSettings['sRol']) {
db.set(`muteroluid_${id}`, newSettings['sRol'])
}
if (newSettings['dils']) {
db.set(`dils_${id}`, newSettings['dils'])
}
if (newSettings['girisCikis']) {
db.set(`gc_${id}`, newSettings['girisCikis'])   
}
if (newSettings['girisM']) {
db.set(`girisM_${id}`, newSettings['girisM']);
}
if (newSettings['cikisM']) {
db.set(`cikisM_${id}`, newSettings['cikisM']);
}
if (newSettings['oynuyor']) {
db.set(`oynuyor_${id}`, newSettings['oynuyor']);
}
if (newSettings['gc']) {
db.set(`gc_${id}`, newSettings['gc']);
}
if (newSettings['destekK']) {
db.set(`destekK_${id}`, newSettings['destekK']);
}
if (newSettings['destekR']) {
db.set(`destekR_${id}`, newSettings['destekR']);
}
if (newSettings['sayacKanal']) {
db.set(`sKanal_${id}`, newSettings['sayacKanal']);
}
if (newSettings['sayac']) {
db.set(`sayac_${id}`, newSettings['sayac']);
}
if (newSettings['dkanal']) {
db.set(`dKanal_${id}`, newSettings['dkanal']);
}
      
      if (newSettings['yapaykanal']) {
db.set(`yapayKanal_${id}`, newSettings['yapaykanal']);
}
     } catch (err) {
      //console.error(err)
    };
        }; 


String.prototype.toProperCase = function() {
return this.charAt(0).toUpperCase() + this.slice(1); 
};

Array.prototype.random = function() {
return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
console.error("Uncaught Exception: ", errorMsg);

process.exit(1);
});

      client.customCmds = (id, cmd) => {
    
    let komut = cmd['komut']
    let aciklama = cmd['aciklama']
    
    var array = []
	  var kontrol2 = []

      let komutlar = client.cmdd
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol2.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  client.panel = {};

    client.customCmds2 = (id, cmdd1) => {
    
    let komut1 = cmdd1['komut']
    let aciklama1 = cmdd1['aciklama']
    
    var array = []
	  var kontrol3 = []
    let komutlar = client.cmdd1
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys1(komutlar[id]).length; i++) {
			if(komut1 === Object.keys1(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys1(komutlar[id][i])[0]}": "${aciklama1}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys1(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys1(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol3.push(Object.keys1(komutlar[id][i])[0].toString())
		}
		if(!kontrol3.includes(komut1)) {
			array.push(JSON.parse(`{"${komut1}": "${aciklama1}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut1}": "${aciklama1}"}`))
		komutlar[id] = array

		fs.writeFile("./filtreler.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
}

 



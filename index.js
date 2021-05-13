if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require('discord.js');
const client = new Discord.Client();
const client2 = new Discord.Client();
const bot = new Discord.Client();
const {MessageEmbed} = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require('chalk');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const db = require("quick.db");
const jimp = require('jimp');
const Jimp = require('jimp')
const snekfetch = require('snekfetch');

let komutum1 = JSON.parse(fs.readFileSync("./filtre.json", "utf8"));
let komutum = JSON.parse(fs.readFileSync("./komutlar.json", "utf8"));

client.cmdd = komutum
client.cmdd3 = komutum1

require("./modüller/fonksiyonlar.js")(client);
require('./util/eventLoader')(client);
client.config = require("./config.js");


client.ayarlar = {
        "oynuyor": ``,
        "official_sahip": "764629593227132970",
        "sahip": "764629593227132970",
        "isim": "NeruaL",
        "webpanel": "https://www.panelnerual.cf/",
        "versiyon": "0.2",
        "prefix": "#",
        "renk":  "GREEN",
        "version":  "versiyon",
		"token": "ODMyNTg5MDAzNjMwMTgyNDEx.YHl-7w.svo3XBhUg8x9ZctZ-q00G4Fr_Hw"
};




const ayarlar = client.ayarlar;




//////////////////////////////////////////////////////////////////////////////////////////
client.on("ready", async () => {
  
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  require("./modüller/panel.js")(client); 
  
  console.log(`» ${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(client.guilds.cache.size)} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(client.users.cache.size.toLocaleString())} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor.")}`)
  client.user.setStatus("online");
 client.user.setActivity(client.ayarlar.oynuyor, { type: 'WATCHING' });
  
})
  //////////////////////////////////////////////////////////////////////////////////////////
  





client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
   console.log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
 




const Topxxggx1 = require('body-parser')
const ejs = require('ejs')
const Topxggx1 = require('request')
const Topvggx1 = require('html')


const url = require("url");
const path = require("path");



const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")
const Strategy = require("passport-discord")

const helmet = require("helmet");



const osutils = require('os-utils');
const os = require('os');
const moments = require("moment-duration-format");
const request = require('node-superfetch');
const crypto = require('crypto');

client.login("ODEyNjkzMDQxNTM3NDgyNzY0.YDEdYA.SVXaMv60oVZRGRiMdCgIsTKLkEM")
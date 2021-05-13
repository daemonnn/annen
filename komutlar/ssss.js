const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
  let id = "402535900115894272" //buranın içerisine kendi id ni yaz
if (message.author.id !== id) return message.channel.send("Bu komutu yalnızca bot yetkilileri kullanabilir!")
    let fake = client.channels.find(c => c.name === "「⛓」code-log");
  let knaladi = args[0]
   const ho1 = new Discord.RichEmbed()
      .setColor('GREEN')
      .addField(`Yeni Bir Kod Paylaşıldı`, `**Kod İsmi:** ${knaladi}\n**Paylaşan Yetkili:** ${message.author.tag}\n**Kategori:** JavaScript`)
fake.sendEmbed(ho1);
  message.guild.createChannel(`「📁」${knaladi}`, 'text').then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "JavaScrıpt - Komutlar")))
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kod-paylaş'],
  permLevel: 0
};

exports.help = {
  name: 'kategori-oluştur'
};


const url = require("url");
const path = require("path");

const Discord = require("discord.js");
var express = require('express');
var app = express();
const moment = require('moment')
moment.locale("tr")
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");
const db = require("quick.db");


module.exports = (client) => {
  
  const bilgiler = {
    oauthSecret: "SmyM4DscJc-8TmGpuh8ai_1sBID_AUdk",
    callbackURL: `https://www.vipadult.cf/callback`,
    domain: `https://www.vipadult.cf/`
  };
    
  const dataDir = path.resolve(`${process.cwd()}${path.sep}panel`);

  const templateDir = path.resolve(`${dataDir}${path.sep}html${path.sep}`);

  app.use("/css", express.static(path.resolve(`${dataDir}${path.sep}css`)));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: bilgiler.oauthSecret,
    callbackURL: bilgiler.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));
app.use(session({secret: "X-q_7AJsJZd2ACL11s1zzWDBOjhRPGvl", resave: true, saveUninitialized: true, cookie: {expires: 2.16e+7}}));

  app.use(session({
    secret: 'xyzxyz',
    resave: true,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  app.locals.domain = bilgiler.domain;
  
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); 
  
  function girisGerekli(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/giris");
  }
  
  const yukle = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  
  let dil = ""
  
  app.get("/", (req, res) => {
        const ping = client.ws.ping
    yukle(res, req, "anasayfa.ejs")
  });

  app.get("/giris", (req, res, next) => {

    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
		
      req.session.backURL = "";
    }
    next();
    

  },
  passport.authenticate("discord"));

  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/en";
    }
    next();
  },
  passport.authenticate("discord"));
  app.get("/autherror", (req, res) => {
res.redirect(`/404`);
  });

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
    if (client.ayarlar.sahip.includes(req.user.id)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);

    } else {
      res.redirect(`anasayfa`);
    }
    

  });
  

  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/anasayfa");
         
    });


  });
  
app.get("/moderation", (req, res) => {
    yukle(res, req, "moderation.ejs");
  });
  
  app.get("/leveling", (req, res) => {
    yukle(res, req, "leveling.ejs");
  });
  
   app.get("/premium", (req, res) => {
    yukle(res, req, "premium.ejs");
  });
app.get("/music", (req, res) => {
    yukle(res, req, "music.ejs");
  });
  app.get("/anasayfa", (req, res) => {
            const ping = client.ws.ping
    yukle(res, req, "anasayfa.ejs");
  });
    app.get("/assests/21klds21j3kljkl.css", (req, res) => {
    yukle(res, req, "annen.ejs");
  });
    app.get("/404", (req, res) => {
            const ping = client.ws.ping
    yukle(res, req, "404.ejs");
  });
    app.get("/yap%C4%B1mc%C4%B1lar", (req, res) => {
    yukle(res, req, "botlist.ejs");
  });
      app.get("/loading", (req, res) => {
    yukle(res, req, "loading.ejs");
  });
        app.get("/gonder", (req, res) => {
    yukle(res, req, "annen.ejs");
  });   
  app.get("/resimyukle.php", (req, res) => {
    yukle(res, req, "annen.ejs");
  });
      app.get("/cerezler", (req, res) => {
    yukle(res, req, "cerezler.ejs");
  });
      app.get("/komutlar", (req, res) => {
    yukle(res, req, "komutlar.ejs");
  });


  app.get("/istatistikler", (req, res) => {
    var istatistik = {
      sunucu: client.guilds.cache.size+" sunucu",
      kanal: client.channels.size+" kanal",
      kullanıcı: client.users.cache.size+" kullanıcı"
    };
    yukle(res, req, "istatistikler.ejs", {istatistik});
  });
  
  app.get("/kullanicilar", (req, res) => {
    yukle(res, req, "kullanıcılar.ejs");
  });
  
  app.get("/kullaniciler/:kullaniciID", (req, res) => {
    const kullanici = client.users.cache.get(req.params.kullaniciID);
    if (!kullanici) return res.json({"hata":"Bot "+req.params.kullaniciID+" ID adresine sahip bir kullanıcıyı göremiyor."});
    yukle(res, req, "kullanıcı.ejs", {kullanici});
  });
  
  app.get("/kullaniciler/:kullaniciID/yonet", girisGerekli, (req, res) => {
    const kullanici = client.users.cache.get(req.params.kullaniciID);
       const member = client.users.cache.get(req.params.kullaniciID);

    if (!kullanici) return res.json({"hata":"Bot "+req.params.kullaniciID+" ID adresine sahip bir kullanıcıyı göremiyor."});
    if (req.user.id !== req.params.kullaniciID) return res.json({"hata":"Başkasının kullanıcı ayarlarına dokunamazsın."});
    yukle(res, req, "k-panel.ejs", {kullanici});
  });
  
  app.post("/kullaniciler/:kullaniciID/yonet", girisGerekli, (req, res) => {
    const kullanici = client.users.cache.get(req.params.kullaniciID);
    if (!kullanici) return res.json({"hata":"Bot "+req.params.kullaniciID+" ID adresine sahip bir kullanıcıyı göremiyor."});
    if (req.user.id !== req.params.kullaniciID) return res.json({"hata":"Başkasının kullanıcı ayarlarına dokunamazsın."});
    client.panel.ayarlar(kullanici.id, kullanici, req.body, req, res);
    res.redirect(`/kullaniciler/${req.params.kullaniciID}/yonet`);
  });
  
  app.get("/kullaniciler/:sunucuID/:ayarID/sifirla", girisGerekli, (req, res) => {
    if (db.has(`${req.params.kullaniciID}.${req.params.ayarID}`) ===  false || req.params.ayarID === "resim" && db.fetch(`${req.params.kullaniciID}.${req.params.ayarID}`) === "https://img.revabot.tk/99kd63vy.png") return res.json({"hata":req.params.ayarID.charAt(0).toUpperCase()+req.params.ayarID.slice(1)+" ayarı "+client.users.cache.get(req.params.kullaniciID).tag+" adlı kullanıcıda ayarlı olmadığı için sıfırlanamaz."});
    db.delete(`${req.params.kullaniciID}.${req.params.ayarID}`)
    res.redirect(`/kullaniciler/${req.params.kullaniciID}/yonet`);
  });
  
  app.get("/sunucular", (req, res) => {
    yukle(res, req, "sunucular.ejs"); //sunucu bilgi gösterme sistemi xd
  });
  
  app.get("/sunucular/:sunucuID", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "sunucular.ejs", {sunucu});
  });
  
  app.get("/:sunucuID/uyeler", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    const tarih = client.user.createdAt
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "üyeler.ejs", {sunucu, tarih});
  });
  
  app.get("/sunucular/:sunucuID/roller", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "roller.ejs", {sunucu});
  });
  
  app.get("/sunucular/:sunucuID/kanallar", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "kanallar.ejs", {sunucu});
  });
  
    app.get("/dashboard/:sunucuID/msjlog", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "yapimasamasi.ejs", {sunucu});
  });
      app.get("/dashboard/:sunucuID/yapayzeka", (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    yukle(res, req, "yapayzeka.ejs", {sunucu});
  });
  app.get("/dashboard", girisGerekli, (req, res) => {
    const perms = Discord.Permissions;
    yukle(res, req, "dashboard.ejs", {perms});
  });
  
  app.get("/dashboard/:sunucuID", girisGerekli, (req, res) => {
    res.redirect(`/dashboard/${req.params.sunucuID}/manage`);
  });

  app.get("/dashboard/:sunucuID/manage", girisGerekli, (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!sunucu) return res.redirect(`/404`);
    const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-ayarlar.ejs", {sunucu, guild});
  });
  

  // OTO TAG SİTEMİ 
  
  
  
        app.post("/dashboard/:guildID/ototag", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.redirect(`/404`);
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/otorol");
  });
  
  
  
      app.get("/dashboard/:guildID/ototag", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return  res.redirect(`/404`);
    yukle(res, req, "sayfa-ototag.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/tag/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`tagB_${req.params.sunucuID}`) === false) return res.json({"hata": "otomatik tag adlı ayar "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`tagB_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/otorol`);
  });
    app.get("/dashboard/:sunucuID/yapayzeka/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`ypyknl_${req.params.sunucuID}`) === false) return res.json({"hata": "otomatik tag adlı ayar "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`ypyknl_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/yapayzeka`);
  });
  
   app.get("/dashboard/:sunucuID/ototagK/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`tagKanal_${req.params.sunucuID}`) === false) return res.json({"hata": "Tag kayıt kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`tagKanal_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/otorol`);
  });
  
  
  
      app.get("/dashboard/:userID/kullanici", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

   yukle(res, req, "k-panel.ejs", {guild, sunucu});
  });
  

  
      app.get("/dashboard/:guildID/otorol", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-otorol.ejs", {guild, sunucu});
  });
        app.get("/dashboard/:guildID/hazirlik", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "hazirlik.ejs", {guild, sunucu});
  });
  // OTOROL
        app.post("/dashboard/:userID/kullanici", girisGerekli, async(req, res) => {
      yukle(res, req, "k-panel.ejs", {});
        })
  
      app.post("/dashboard/:guildID/otorol", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/otorol");
  });
  
  ////////////////
  
  
         app.get("/dashboard/:guildID/kurulum", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-kurulum.ejs", {guild, sunucu});
  }); 
           app.get("/dashboard/:guildID/dil", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-adım.ejs", {guild, sunucu});
  }); 
             app.get("/dashboard/:guildID/koruma", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
db.set(`seçimm1_${req.params.guildID}`, true)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-adım2.ejs", {guild, sunucu});
  }); 
  
               app.get("/dashboard/:guildID/premiumplan", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
      var tarih = [moment().format('DD-MM-YYYY | H:mm:ss')]             
                 db.set(`premium_${req.params.guildID}`, true)
                 db.set(`premiumtarih1_${sunucu}`, tarih)
                                  db.delete(`basitplan_${sunucu}`)
                                  db.set(`premiumtarih1_${sunucu.id}`, tarih)
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "premiumplan.ejs", {guild, sunucu});
  }); 
                 app.get("/dashboard/:guildID/fatura", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "fatura.ejs", {guild, sunucu});
  }); 
                 app.get("/dashboard/:guildID/bastankurulum", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
                 db.delete(`basit_${req.params.guildID}`, true)
                                    db.delete(`dils_${req.params.guildID}`)
                                                   db.delete(`prefix_${req.params.guildID}`)
                                                   db.delete(`muteroluid_${req.params.guildID}`)
                                                   db.delete(`dils_${req.params.guildID}`)
                   db.delete(`premium_${req.params.guildID}`)
                                   db.delete(`premiumtarihi_${req.params.guildID}`)
                                                db.delete(`basitplan_${req.params.guildID}`)
                   db.delete(`seçimm1_${req.params.guildID}`)
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "baştankurulum.ejs", {guild, sunucu});
  }); 
                 app.get("/dashboard/:guildID/basitplan", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
                 db.set(`basit_${req.params.guildID}`, true)
                                                     db.delete(`premium_${sunucu}`)
                      db.delete(`premium_${sunucu.id}`)
                   db.delete(`premiumtarihi_${sunucu.id}`)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "basitplan.ejs", {guild, sunucu});
  }); 
             app.get("/dashboard/:guildID/genelayarlar", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-adım3.ejs", {guild, sunucu});
  }); 
             app.get("/dashboard/:guildID/hazirlik", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-adım4.ejs", {guild, sunucu});
  }); 
           app.get("/dashboard/:guildID/secim", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "o-seçim.ejs", {guild, sunucu});
  }); 
        app.get("/dashboard/:guildID/dilsistemi", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "dil.ejs", {guild, sunucu});
  });
  
  // OTOROL
        app.post("/dashboard/:userID/kullanici", girisGerekli, async(req, res) => {
      yukle(res, req, "k-panel.ejs", {});
        })
  
      app.post("/dashboard/:guildID/dilsistemi", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/dilsistemi");
  });
  
        app.post("/dashboard/:guildID/genelayarlar", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/hazirlik");
  });
  ////////
  
        app.post("/dashboard/:guildID/dil", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/koruma");
  });
  ////////////////
  
  
  
  
               app.get("/dashboard/:guildID/ozellestir", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
db.set(`seçimm1_${req.params.guildID}`, true)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "özelleştir1.ejs", {guild, sunucu});
  }); 

          app.post("/dashboard/:guildID/ozellestir", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/girisyapiliyor");
  });
  
  
                  app.get("/dashboard/:guildID/girisyapiliyor", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
db.set(`seçimm1_${req.params.guildID}`, true)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "özelleştirbeklet.ejs", {guild, sunucu});
  }); 

  
                 app.get("/dashboard/:guildID/verilercekiliyor", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
db.set(`seçimm1_${req.params.guildID}`, true)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "özelleştirbeklet2.ejs", {guild, sunucu});
  }); 
  
                   app.get("/dashboard/:guildID/botuekle", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);
db.set(`seçimm1_${req.params.guildID}`, true)
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "özelleştirekle.ejs", {guild, sunucu});
  }); 
  
            app.post("/dashboard/:guildID/botuekle", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/ozellestirson");
  });
  
  ///////////////
  
      app.get("/dashboard/:guildID/otorol", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
            const sunucu = client.guilds.cache.get(req.params.guildID);

if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-otorol.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/otorol/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`otoR_${req.params.sunucuID}`) === false) return res.json({"hata": "Otorol adlı ayar "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`otoR_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/otorol`);
  });
  
    app.get("/dashboard/:sunucuID/dilsistemi/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`dils_${req.params.sunucuID}`) === false) return res.json({"hata": "Otorol adlı ayar "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`dils_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/dilsistemi`);
  });
  
   app.get("/dashboard/:sunucuID/otoRK/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`otoRK_${req.params.sunucuID}`) === false) return res.json({"hata": "Otorol kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`otoRK_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/otorol`);
  });
  
  // FİLTRE
///////////////  
app.get("/dashboard/:sunucuID/msjlog/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`msjlog_${req.params.sunucuID}`) === false) return res.json({"hata": "Mesaj Log kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`msjlog_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/msjlog`);
  });
  app.get("/dashboard/:sunucuID/msjdlog/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`msjdlog_${req.params.sunucuID}`) === false) return res.json({"hata": "Mesaj Düzenleme Log kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`msjdlog_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/msjlog`);
  });
  app.get("/dashboard/:sunucuID/ypyknl/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`ypyknl_${req.params.sunucuID}`) === false) return res.json({"hata": "Mesaj Düzenleme Log kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`ypyknl_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/yapaykanal`);
  });
  app.get("/dashboard/:sunucuID/renk/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`renk_${req.params.sunucuID}`) === false) return res.json({"hata": "Renk   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`renk_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/msjlog`);
  });
  app.get("/dashboard/:sunucuID/renk/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`renk_${req.params.sunucuID}`) === false) return res.json({"hata": "Mesaj Log kanalı   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`renk_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/renk`);
  });
        app.post("/dashboard/:guildID/msjlog", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/msjlog");
  });
  
        app.post("/dashboard/:guildID/yapayzeka", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/yapayzeka");
  });
  
          app.post("/dashboard/:guildID/seviye", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const id = db.fetch(`id_${req.params.guildID}`)
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
        // console.log(req.body) 

    client.writeSettings(guild.id, req.body);
 
    res.redirect("/dashboard/"+req.params.guildID+"/seviye");
  });
  //////////////////
    app.get("/dashboard/:guildID/filtre", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-filtre.ejs", {sunucu, guild});
  });
      app.get("/dashboard/:guildID/seviye", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "seviye.ejs", {sunucu, guild});
  });
  
  //////////////////
    app.get("/dashboard/:guildID/dilsistemi", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "dil.ejs", {sunucu, guild});
  });
  
  
  
  
    app.post("/dashboard/:guildID/filtre", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
      
    if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
  
    client.writeSettings(guild.id, req.body);
       
   //console.log(req.body)
    res.redirect("/dashboard/"+req.params.guildID+"/filtre");
  });
  
  
    app.get("/dashboard/:guildID/filtre/sil", girisGerekli, async (req, res) => {
res.redirect("/dashboard/"+req.params.guildID+"/filtre");
});

  
  
 
app.get("/dashboard/:guildID/filtre/sil/:cmdID", girisGerekli, async (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});


var komutf = req.params.cmdID;


if(!db.fetch(`filtre_${req.params.guildID}`).includes(komutf)) {
res.json({"hata":`Filtre bulunamadı veya silinmiş.`});
} else {

let x = komutf
let arr = []
db.fetch(`filtre_${req.params.guildID}`).forEach(v => {
if (v !== x) {
arr.push(v)
}
})
  

db.set(`filtre_${req.params.guildID}`, arr)
  
}

res.redirect("/dashboard/"+req.params.guildID+"/filtre");
});

  
  // ÖZEL KOMUT
  
  
  app.get("/dashboard/:guildID/ozelkomutlar", girisGerekli, (req, res) => {
  const guild = client.guilds.cache.get(req.params.guildID);
        const sunucu = client.guilds.cache.get(req.params.guildID);

 if (!guild) return res.redirect(`/404`);
  const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
  yukle(res, req, "sayfa-ozelkomutlar.ejs", {guild, sunucu});
});

  app.post("/dashboard/:guildID/ozelkomutlar", girisGerekli, (req, res) => {
  const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
  const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});

  client.customCmds(guild.id, req.body);
  res.redirect("/dashboard/"+req.params.guildID+"/ozelkomutlar");
});
  
  
  
  app.get("/dashboard/:guildID/ozelkomutlar", girisGerekli, (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
yukle(res, req, "sayfa-ozelkomutlar.ejs", {guild, sunucu});
});

app.post("/dashboard/:guildID/ozelkomutlar", girisGerekli, (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});

  
  
client.customCmds(guild.id, req.body);
res.redirect("/dashboard/"+req.params.guildID+"/ozelkomutlar");
});
  
  
  app.get("/dashboard/:guildID/ozelkomutlar/sil", girisGerekli, async (req, res) => {
res.redirect("/dashboard/"+req.params.guildID+"/ozelkomutlar");
});

  
  
  const fs = require('fs');
app.get("/dashboard/:guildID/ozelkomutlar/sil/:cmdID", girisGerekli, async (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});


var komut = req.params.cmdID;

let komutlar = client.cmdd
if(komutlar[req.params.guildID].length === 1) {
 if(Object.keys(komutlar[req.params.guildID][0])[0].toString() === komut) {
   delete komutlar[req.params.guildID]
   fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
     console.log(err)
   })
 }
} else {
for (var i = 0; i < komutlar[req.params.guildID].length; i++) {
 if(Object.keys(komutlar[req.params.guildID][i])[0].toString() === komut) {
   komutlar[req.params.guildID].splice(i, 1);

   fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
     console.log(err)
   })
 }
}
}

res.redirect("/dashboard/"+req.params.guildID+"/ozelkomutlar");
});
  
  
  
   app.get("/dashboard/:guildID/kelimefiltresi", girisGerekli, (req, res) => {
  const guild1 = client.guilds.cache.get(req.params.guildID);
        const sunucu1 = client.guilds.cache.get(req.params.guildID);

 if (!guild1) return res.redirect(`/404`);
  const isManaged = guild1 && !!guild1.member(req.user.id) ? guild1.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
  yukle(res, req, "kelime.ejs", {guild1, sunucu1});
});

  app.post("/dashboard/:guildID/kelimefiltresi", girisGerekli, (req, res) => {
  const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
  const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});

  client.customCmds(guild.id, req.body);
  res.redirect("/dashboard/"+req.params.guildID+"/kelimefiltresi");
});
  
  
  
  app.get("/dashboard/:guildID/kelimefiltresi", girisGerekli, (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
yukle(res, req, "kelime.ejs", {guild, sunucu});
});

app.post("/dashboard/:guildID/kelimefiltresi", girisGerekli, (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});

  
  
client.customCmds(guild.id, req.body);
res.redirect("/dashboard/"+req.params.guildID+"/kelimefiltresi");
});
  
  
  app.get("/dashboard/:guildID/kelimefiltresi/sil", girisGerekli, async (req, res) => {
res.redirect("/dashboard/"+req.params.guildID+"/kelimefiltresi");
});


app.get("/dashboard/:guildID/kelimefiltresi/sil/:cmdID", girisGerekli, async (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});


var komut = req.params.cmdID;

let komutlar1 = client.cmdd3
if(komutlar1[req.params.guildID].length === 1) {
 if(Object.keys1(komutlar1[req.params.guildID][0])[0].toString() === komut) {
   delete komutlar1[req.params.guildID]
   fs.writeFile("./filtre.json", JSON.stringify(komutlar1), (err) => {
     console.log(err)
   })
 }
} else {
for (var i = 0; i < komutlar1[req.params.guildID].length; i++) {
 if(Object.keys1(komutlar1[req.params.guildID][i])[0].toString() === komut) {
   komutlar1[req.params.guildID].splice(i, 1);

   fs.writeFile("./filtre.json", JSON.stringify(komutlar1), (err) => {
     console.log(err)
   })
 }
}
}

res.redirect("/dashboard/"+req.params.guildID+"/kelimefiltresi");
});
  
  
  
  //////
  /////
  /////
  ////
 
  //DAVET SİSTEMİ
   app.post("/manage/:guildID/modlog", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/manage/"+req.params.guildID+"/modlog");
  });
  
  
  
      app.get("/manage/:guildID/modlog", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-modlog.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/manage/:sunucuID/modlog/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`log_${req.params.sunucuID}`) === false) return res.json({"hata": "Modlog kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`log_${req.params.sunucuID}`)
    res.redirect(`/manage/${req.params.sunucuID}/modlog`);
  });
    app.get("/manage/:sunucuID/dilsistemi/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`dils_${req.params.sunucuID}`) === false) return res.json({"hata": "Modlog kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`dils_${req.params.sunucuID}`)
    res.redirect(`/manage/${req.params.sunucuID}/dilsistemi`);
  });
        app.post("/dashboard/:guildID/davetsistemi", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/davetsistemi");
  });
  
  
  
      app.get("/dashboard/:guildID/davetsistemi", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-davet.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/dkanal/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`dKanal_${req.params.sunucuID}`) === false) return res.json({"hata": "Davet kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`dKanal_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/davetsistemi`);
  });
  
  //GİRİŞ ÇIKIŞ
  
  
  

  
        app.post("/dashboard/:guildID/giriscikis", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/giriscikis");
  });
  
  
  
      app.get("/padashboardnel/:guildID/giriscikis", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-girişçıkış.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/cikism/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`cikisM_${req.params.sunucuID}`) === false) return res.json({"hata": "Çıkış mesajı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`cikisM_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/giriscikis`);
  });
    app.get("/dashboard/:sunucuID/girisk/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`gc_${req.params.sunucuID}`) === false) return res.json({"hata": "Giriş çıkış kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`gc_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/giriscikis`);
  });
  
   app.get("/dashboard/:sunucuID/girism/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`girisM_${req.params.sunucuID}`) === false) return res.json({"hata": "Giriş mesajı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`girisM_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/giriscikis`);
  });
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  // DESTEK SİTEM
  
      app.post("/dashboard/:guildID/yapaykanal", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/yapaykanal");
  });
  
  
  
      app.get("/dashboard/:guildID/yapaykanal", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-destek.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/yapaykanal/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`yapaykanal_${req.params.sunucuID}`) === false) return res.json({"hata": "Destek kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`yapaykanal_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/yapaykanal`);
  });
  
   app.get("/dashboard/:sunucuID/yapaykanal/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`yapaykanal_${req.params.sunucuID}`) === false) return res.json({"hata": "Destek Rolü "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`yapaykanal_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/yapaykanal`);
  });
  
  
  
// SAYAÇ SİSTEMİ
          app.post("/dashboard/:guildID/sayac", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/sayac");
  });
  
  
  
      app.get("/dashboard/:guildID/sayac", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-sayaç.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/skanal/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`sKanal_${req.params.sunucuID}`) === false) return res.json({"hata": "Çıkış mesajı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`sKanal_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/sayac`);
  });
    app.get("/dashboard/:sunucuID/sayac/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`sayac_${req.params.sunucuID}`) === false) return res.json({"hata": "Giriş çıkış kanalı "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`sayac_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/sayac`);
  });


// GENEL AYARLAR
 

         app.post("/dashboard/:guildID/genel", girisGerekli, async(req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
      const sunucu = client.guilds.cache.get(req.params.sunucuID);
   if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   
    client.writeSettings(guild.id, req.body);
       
 
    res.redirect("/dashboard/"+req.params.guildID+"/genel");
  });
  
  
  
      app.get("/dashboard/:guildID/genel", girisGerekli, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    const sunucu = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    yukle(res, req, "sayfa-genel.ejs", {guild, sunucu});
  });
  
  
  
  app.get("/dashboard/:sunucuID/srol/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`muteroluid_${req.params.sunucuID}`) === false) return res.json({"hata": "Susturma rolü "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`muteroluid_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/genel`);
  });
  
   app.get("/dashboard/:sunucuID/prefix/sifirla", girisGerekli, (req, res) => {
    if (client.ayar.has(`prefix_${req.params.sunucuID}`) === false) return res.json({"hata": "Prefix   "+client.guilds.cache.get(req.params.sunucuID).name+" adlı sunucuda ayarlı olmadığı için sıfırlanamaz."});
    client.ayar.delete(`prefix_${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/genel`);
  });
  
  
  
  
    app.get("/dashboard/:guildID/komut-yasak/sil", girisGerekli, async (req, res) => {
res.redirect("/dashboard/"+req.params.guildID+"/genel");
});

  
  
 
app.get("/dashboard/:guildID/komut-yasak/sil/:cmdID", girisGerekli, async (req, res) => {
const guild = client.guilds.cache.get(req.params.guildID);
if (!guild) return res.redirect(`/404`);
const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});


var komutf = req.params.cmdID;


if(!db.fetch(`yasakK_${req.params.guildID}`).includes(komutf)) {
res.json({"hata":`Yasaklanan komut bulunamadı veya silinmiş.`});
} else {

let x = komutf
let arr = []
db.fetch(`yasakK_${req.params.guildID}`).forEach(v => {
if (v !== x) {
arr.push(v)
}
})
  

db.set(`yasakK_${req.params.guildID}`, arr)
  
}

res.redirect("/dashboard/"+req.params.guildID+"/genel");
});


  
  
  

  
  
  app.post("/dashboard/:sunucuID/manage", girisGerekli, (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    const g = client.guilds.cache.get(req.params.sunucuID);
    if (!sunucu) return res.redirect(`/404`);
    const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    
    if (req.body['komut'] && req.body['aciklama']) {
      if (client.kayıt.komutlar.has(req.body['komut']) === true || client.kayıt.alternatifler.has(req.body['komut'])) return res.json({"hata":"Botun zaten var olan bir komutu özel komut olarak eklenemez."});
      if (db.has(`${sunucu.id}.özelKomutlar`) === true) {
        for (var i = 0; i < db.fetch(`${sunucu.id}.özelKomutlar`).length; i++) {
          if (Object.keys(db.fetch(`${sunucu.id}.özelKomutlar`)[i])[0] === req.body['komut']) return res.json({"hata":"Sunucuda "+req.body['komut']+" adlı bir özel komut zaten bulunduğu için tekrar eklenemez."});
        }  
      }
    }
    

  
    if (req.body['ban']) {
      if (sunucu.members.cache.get(client.user.id).permissions.has("BAN_MEMBERS") === false) return res.json({"hata":"Botun "+sunucu.name+" adlı sunucuda Üyeleri Yasakla (BAN_MEMBERS) izni olmadığı için "+client.users.cache.get(req.body['ban']).tag+" adlı üye yasaklanamıyor."});
    }
    if (req.body['unban']) {
      require('request')({
        url: `https://discordapp.com/api/v7/users/${req.body['unban']}`,
        headers: {
          "Authorization": `Bot ${client.token}`
        }
      }, async function(error, response, body) {
        if (JSON.parse(body).message && JSON.parse(body).message === "Invalid Form Body") return res.json({"hata":"Discord'da "+req.body['unban']+" ID adresine sahip bir kullanıcı bulunmuyor."});
        let bans = await sunucu.fetchBans();
        if (bans.has(req.body['unban']) === false) return res.json({"hata":sunucu.name+" sunucusunda "+JSON.parse(body).username+"#"+JSON.parse(body).discriminator+" adlı kullanıcı yasaklı olmadığı için yasağını kaldıramam."});
        res.redirect(`/dashboard/${req.params.sunucuID}/yonet`);
      });
      return
    }
    if (req.body['kick']) {
      if (sunucu.members.cache.get(client.user.id).permissions.has("KICK_MEMBERS") === false) return res.json({"hata":"Botun "+sunucu.name+" adlı sunucuda Üyeleri At (KICK_MEMBERS) izni olmadığı için "+client.users.cache.get(req.body['kick']).tag+" adlı üye atılamıyor."}); 
    }
    
    client.panel.ayarlarKaydet(sunucu.id, sunucu, req.body, req, res);
    res.redirect(`/dashboard/${req.params.sunucuID}/yonet`);
  });


  
  app.get("/admin", girisGerekli, (req, res) => {
    yukle(res, req, "admin.ejs");
  });
  
  app.get("/addbot", (req, res, sunucu) => {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=832589003630182411&scope=bot&permissions=2104519902&response_type=code&redirect_uri=https%3A%2F%2Fwww.panelnerual.cf%2Fdashboard&guild_id=${sunucu.id}`);
  });
  app.get("/sunucular/:sunucuID/botuat", girisGerekli, (req, res) => {
    client.guilds.cache.get(req.params.sunucuID).leave();
    res.redirect("/sunucular");
  });
  
 
  //İngilizce Bölümler
  
  app.listen(8080);
};


const fs = require("fs");
const util = require("util");
const Discord = require("discord.js");

const genNames = ["HULU","NITRO", "VPN","NETFLIX","MINECRAFT","PORNHUB","DISNEY","FORTNITE","WINDOWS","SPOTIFY","COD","BUFFALOWINGS","CrunchyRoll"];
const fileNames = [
  __dirname + "/../accounts/hulu.txt",
  __dirname + "/../accounts/nitro.txt",
  __dirname + "/../accounts/vpn.txt",
  __dirname + "/../accounts/netflix.txt",
  __dirname + "/../accounts/minecraft.txt",
  __dirname + "/../accounts/pornhub.txt",
  __dirname + "/../accounts/Disney.txt",
  __dirname + "/../accounts/Fortnite.txt",
  __dirname + "/../accounts/Windows.txt",
  __dirname + "/../accounts/Spotify.txt",
  __dirname + "/../accounts/cod.txt",
  __dirname + "/../accounts/buffalowings.txt",
  __dirname + "/../accounts/Crunchyroll.txt"
];

exports.run = async (client, message, args, level) => {
  var cmd = message.content.split(" ");

  if (cmd[1].toUpperCase() === "LIST") {
    message.channel.send(accList);
  } else if (cmd[1].toUpperCase() === "STOCK") {
    let embed = {
      title: "Gen Stock",
      description: "Avaliable stock in the generator",
      color: 4304252,
      fields: []
    };
    for (let x = 0; x < fileNames.length; x++) {
      let r = await stock(x);
      //message.channel.send(`${genNames[x]} - ${r}`);
      //embed.addField(genNames[x].capitalize(), `${r}`);
      embed.fields.push({
          name: genNames[x].capitalize(),
          value: '`' + r + '`',
          inline: true
        })
    }
    message.channel.send({ embed });
  } else if (genNames.includes(cmd[1].toUpperCase()) && cmd[1]) {
    gen(cmd[1].toUpperCase(), function(account) {
      const m = message
        .reply(
          "Look in dms for your account! If it doesn't work make sure you dm a staff member!"
        )
        .then(() => {
          message.author.send(`<@${message.author.id}> ` + account);
          setTimeout(function() {
            m.delete();
            console.log("deleted");
          }, 5000);
        });
    });
  } else {
    message.channel.send("Invalid account.");
  }
};

// .capitalize to String function
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

function gen(acc, callback) {
  var index = genNames.indexOf(acc);
  //console.log(`INDEX: ${index} | CONTENT: ${fileNames[index]}`)
  fs.readFile(fileNames[index], "utf8", (err, data) => {
    var credStr = data;
    var creds = credStr.split("\n");
    callback(creds[Math.floor(Math.random() * creds.length)]);
  });
}

async function stock(accIndex, cb) {
  var credStr = await readFile(fileNames[accIndex]);
  var creds = credStr.split("\n");
  return creds.length;
}

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", function(error, data) {
      if (error) return reject(error);

      return resolve(data);
    });
  });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "gen",
  category: "Miscelaneous",
  description: "generate an account",
  usage: "gen <acc>"
};

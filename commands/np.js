const Discord = require('discord.js');
const settings = require('../settings.json');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  
        const ytdl = require('ytdl-core');
        const serverQueue = client.musicQueue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(':x: There is nothing playing.');
        if (!serverQueue.playing) return message.channel.send(':x: There is nothing playing.');
        let data = await Promise.resolve(ytdl.getInfo(serverQueue.songs[0].url));
        let songtime = (data.length_seconds * 1000).toFixed(0);
        let completed = (serverQueue.connection.dispatcher.time).toFixed(0);
        let barlength = 30;
        let completedpercent = ((completed / songtime) * barlength).toFixed(0);
        let array = []; for (let i = 0; i < completedpercent - 1; i++) { array.push('⎯'); } array.push('⭗'); for (let i = 0; i < barlength - completedpercent - 1; i++) { array.push('⎯'); }
        const embed = new Discord.RichEmbed()
            .setTitle("__Now playing__")
            .setDescription(`🎶**Now playing:** ${serverQueue.songs[0].title}\n${array.join('')} | \`${client.funcs.msToTime(completed)} / ${client.funcs.msToTime(songtime)}\``)
            .setFooter(`Queued by ${serverQueue.songs[0].author.tag}`)
            .setURL(serverQueue.songs[0].url)
            .setColor(settings.embedColor)
        return message.channel.send(embed);
  
 
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  
};

exports.help = {
    name: 'np',
    category: 'Music',
    description: 'Check what song is playing',
    usage: 'np'
};
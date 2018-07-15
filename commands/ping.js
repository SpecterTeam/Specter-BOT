const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    let api = Math.round(bot.ping);
    let latency = message.author.createdTimestamp - message.createdTimestamp;

    const Embed = new Discord.RichEmbed()
            .setColor(bot.color)
            .setAuthor(bot.user.tag, bot.user.avatarURL)
            .addField(`API`, api, true)
            .addField(`Latency`, latency, true)
            .setFooter(bot.footerText)

    return message.channel.send(Embed).catch(error => message.channel.send(error));
};

module.exports.help = {
    name: `ping`
}

const Discord = require('discord.js');
const os = require('os');
const moment = require('moment');
require('moment-duration-format');
const bot = new Discord.Client();

const config = require('./assets/json/config.json');

bot.on('ready', () => {
    console.log(`${bot.user.tag} is UP and RUNNING.`);
    bot.user.setActivity('over', { type: 'WATCHING' });
});

bot.color = 0x36393e;
bot.footerText = 'Specter Bot produced by Specter Team.';
bot.prefix = 's.';
bot.nodeID = '';

bot.on('message', async (message) => {
    
   if (!message.member) return;
    if (!message.author.bot && message.channel.type !== 'text') {

        const embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle('Sorry, this bot only runs in servers!')
            .setFooter(client.footerText)

        message.channel.send(embed).catch(err => console.log(err));

    }

    if (!message.guild.me.hasPermission('ADMINISTRATOR') && message.content.startsWith(bot.prefix)) {

        const embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setFooter('Sorry, to ensure all active servers get the best possible speed, all servers where the bot does not have Administrator are disabled. If you don\'t feel comfortable with this you may download and host the bot yourself at our GitHub repo.')


        message.channel.send(embed).catch(err => console.log(err));

    } else if (!message.guild.me.hasPermission('ADMINISTRATOR')) return;

    if (message.author.bot) return;
    

    // Variables
    let args = message.content.slice(bot.prefix.length).trim().split(" "),
        cmd = args.shift().toLowerCase();

    if (cmd !== 'limits' && !args[0] && bot.isNode) return;
    if (!message.content.startsWith(bot.prefix)) return;


    // Run Commands
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(bot, message, args, bot.tools);
    } catch (e) {
        console.log(e.stack);
    }
});

bot.login(config.bot.TOKEN);

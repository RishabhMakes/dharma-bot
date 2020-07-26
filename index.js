const Discord = require('discord.js');
const {prefix, token, giphy_key} = require('./config.json');
const fetch = require('node-fetch');
var giphy = require('giphy-api')(giphy_key);
const client = new Discord.Client();
const channels=[];

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 client.channels.cache.forEach(t => channels.push(t));
 console.log(channels);
 });

client.on('message', msg => {
 if (msg.content === 'ping') {
 msg.channel.send('pong');
 console.log(msg);
}

 if (msg.content.startsWith(`${prefix}`)) {
    msg.reply('ruff ruff');
    }
// console.log(msg.author.username) 

if(!msg.author.bot && msg.content === 'hey dharma'){
    msg.reply('Hey '+ msg.author.username);
    channels[4].send(`hellooooo channel ${channels[4].name}`);
}

if(msg.content === 'cuteness'){
    giphy.random('doggo', function (err, res) {
        console.log(res.data.image_url);
        embed(msg,res.data.image_url);
    });
}

});

client.login(token);


function embed(msg,url){
    console.log('starting embed creation')
    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('GIFs are here')
	.setDescription('Woof woof I am learning to post GIFs')
	.setImage(url)
	.setTimestamp()
	// Send the embed to the same channel as the message
    console.log(embed);
    msg.channel.send(embed);
}





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
    msg.content=msg.content.toLowerCase();
    
 if (msg.content === 'ping') {
 msg.channel.send('pong');
 console.log(msg);
}
if (msg.content === 'stop') {
    clearInterval(roamTimer);
    msg.channel.send('timer cleared');
    console.log('cleared roam timer');
   }

if (msg.content === 'start') {
    var roamTimer =setInterval(roam, 10000);
    msg.channel.send('timer started');
    console.log('timer started');
}

if (msg.content.includes("dharma")) {
    msg.channel.send('🐾 woof woof!');
    }
// console.log(msg.author.username) 

if(!msg.author.bot && msg.content === 'hey dharma'){
    msg.reply('Hey '+ msg.author.username);
    msg.react('❤️');
    // channels[4].send(`hellooooo channel ${channels[4].name}`);
}

if(msg.content.includes('🍕')){
    msg.channel.send('🥺');
}

if(msg.content.includes('good') && (msg.content.includes('boi') || msg.content.includes('boy') || msg.content.includes('girl')|| msg.content.includes('gurl'))){
    giphy.random('doggo', function (err, res) {
        console.log(res.data.image_url);
        embed(msg,res.data.image_url);
    });
}

randomPoop(msg);

});

client.login(token);
// var roamTimer =setInterval(roam, 10000);

function roam(){
    try{
    var rand = randomInt(0,channels.length);
    if(channels[rand].type=='text'){
        // channels[rand].send(`hellooooo ${channels[rand].name}, I have arrived here randomly`);
        channels[rand].send('🐾'); 
        // channels[rand].send('💩');
    } 
    } catch(err){
        console.log(err);
    }
}

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

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

function randomPoop(msg){
    if(Math.random()<0.02){
        msg.react('💩');
    }

    if(Math.random()<0.02){
        msg.react('❤️');
    }
}

//THIS CODE CAN BE USED TO WAIT FOR REACTIONS

// const filter = (reaction, user) => {
// 	return reaction.emoji.name === '🍕' && user.id === message.author.id;
// };

// message.awaitReactions(filter, { max: 4, time: 60000, errors: ['time'] })
// 	.then(collected => console.log(collected.size))
// 	.catch(collected => {
// 		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
// 	});

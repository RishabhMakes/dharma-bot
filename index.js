const Discord = require('discord.js');
const { prefix, token, giphy_key } = require('./config.json');
const fetch = require('node-fetch');
const giphy = require('giphy-api')(giphy_key);
const client = new Discord.Client();
const channels = [];
const confessionsChannels = [];
const { parse } = require('querystring');
const http = require("http");

let roamTimer;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.forEach(t => channels.push(t));
    console.log(channels);
    channels.forEach(t => {
        if(t.name=="confessions"){
            confessionsChannels.push(t);
        }
    });
    console.log(`confession channels are:`);
    console.log(confessionsChannels);
});

client.on('message', msg => {
    msg.content = msg.content.toLowerCase();

    if (msg.content === 'ping') {
        msg.channel.send('pong');
        console.log(msg.channel);
    }
    if (msg.content === 'stop') {
        clearInterval(roamTimer);
        msg.channel.send('timer cleared');
        console.log('cleared roam timer');
    }

    if (msg.content === 'start') {
        roamTimer = setInterval(roam, 1000000);
        msg.channel.send('timer started');
        console.log('timer started');
    }

    if (msg.content.includes("dharma")) {
        msg.channel.send('🐾 woof woof!');
        msg.react('❤️');
    }
    // console.log(msg.author.username)

    if (!msg.author.bot && msg.content === 'hey dharma') {
        msg.reply('Hey ' + msg.author.username);
        msg.react('❤️');
        // channels[4].send(`hellooooo channel ${channels[4].name}`);
    }

    if (msg.content.includes('🍕')) {
        msg.channel.send('🥺');
    }

    if (msg.content.includes('dharma') && msg.content.includes('help')) {
        embedHelp(msg);
    }

    if (msg.content.includes('good') && (msg.content.includes('boi') || msg.content.includes('boy') || msg.content.includes('girl') || msg.content.includes('gurl'))) {
        giphy.random('doggo', function (err, res) {
            console.log(res.data.image_url);
            embed(msg, res.data.image_url);
        });
    }

    randomPoop(msg);

});

client.login(token);
var roamTimerDef =setInterval(roam, 1000000);

function roam() {
    try {
        const rand = randomInt(0, channels.length);
        if (channels[rand].type == 'text') {
            // channels[rand].send(`hellooooo ${channels[rand].name}, I have arrived here randomly`);
            channels[rand].send('🐾');
            // channels[rand].send('💩');
        }
    } catch (err) {
        console.log(err);
    }
}

function embed(msg, url) {
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

function embedHelp(msg) {
    console.log('starting help embed creation')
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('What can I do?')
        .setDescription('I can do a few things, here they are!')
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Roaming around', value: 'I just hang out in IDC and chill in studios' },
            { name: 'Call me a good girl', value: 'I bless you with GIF goodness' },
            { name: 'Ping', value: 'You say Ping, I say Pong', inline: true },
            { name: 'Hey Dharma', value: 'You say Hey, I say Hey!', inline: true },
            { name: 'You have Pizza 🍕', value: 'I come around asking', inline: true },
        )
        .setFooter('I am still finding my voice. Stick around! Till then, go meet my hooman help @rishabhmakes');
    // Send the embed to the same channel as the message
    console.log(embed);
    msg.channel.send(embed);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

function randomPoop(msg) {
    if (Math.random() < 0.02) {
        msg.react('💩');
    }

    if (Math.random() < 0.02) {
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

// CODE FOR CONFESSIONS FORM

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Thanks for sending in your confession, woof!`);
            // console.log(channels[2].type);
            confessionsChannels[0].send(`|| ${result.message} ||`);
        });
    } 
    else {
        //Send the HTML form
        res.end(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IDC Confession Form</title>
    <style>
        body {
            /* background-color: #DBF285; */
            color: #813AA6;
            padding-top: 50px;
        }

        h1 {
            margin: 20px auto;
            margin-top: 15px;
            font-size: 50px;
            text-align: center;
            width: 300px;
            /* text-shadow: 2px 2px #F29D35; */
            animation: shad-anim 1s linear infinite alternate;
        }

        @keyframes shad-anim {
            0% {
                text-shadow: 2px 2px #F29D35;
            }

            0% {
                text-shadow: 12px 5px #F29D35;
            }
        }

        p {
            margin: 5px auto;
            margin-bottom: 25px;
            font-size: 16px;
            text-align: center;
            width: 300px;
        }

        form {
            /* Center the form on the page */
            margin: 0 auto;
            width: 300px;
            /* Form outline */
            padding: 1em;
            border: 1px solid #D97652;
            border-radius: 1em;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        form li+li {
            margin-top: 1em;
        }

        input,
        textarea {
            font: 1em sans-serif;
            width: 300px;
            box-sizing: border-box;
            border: 1px solid #D97652;
            border-radius: 0.25em;
        }

        input:focus,
        textarea:focus {
            border-color: #000;
        }

        textarea {
            height: 9em;
        }

        button {
            margin: 5px auto;
            margin-top: 15px;
            width: 80px;
            height: 40px;
        }
    </style>
</head>

<body>
    <form action="/" method="post">
        <h1>CONFESS!</h1>
        <p>Put all your sins to rest here. Bitch about that Prof 🧐, let out your P2 rant 😵, tell that drunk story 🍻,
            that
            risky score 🌿, or that cutie you've been eyeing on zoom calls 👀</p>
        <ul>
            <li>
                <textarea id="msg" name="message"></textarea>
            </li>
        </ul>
        <center><button type="submit">Send</button></center>
    </form>
</body>

</html>
        `);
    }
});
server.listen(8000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
// const { Telegraf } = require('telegraf');
// const axios = require('axios');

// const bot = new Telegraf('6420697483:AAFWG0Bhw0b0Pv4XZNcJulLGjzOs0gjFAV8');
// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

// bot.on('message', async (ctx) => {
// 	if (ctx.message.location) {
// 		const weatherAPIUrl = `https://openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=2ca6774e04c3e69ed3c5702f52b3da53`;
// 		const response = await axios.get(weatherAPIUrl);
// 	}
// });

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// //369731b83f3e56017f4e4093571d41fe

//require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('6420697483:AAFWG0Bhw0b0Pv4XZNcJulLGjzOs0gjFAV8');
const APIid = '2ca6774e04c3e69ed3c5702f52b3da53';

bot.start((ctx) => ctx.reply('Send me your geolocation'));

bot.on('message', async (ctx) => {
	console.log(ctx.message);
	if (ctx.message.location) {
		const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${APIid}`;
		try {
			const response = await axios.get(weatherAPIUrl);
			const weatherDescription = response.data.weather[0].description;
			const temperature = response.data.main.temp;
			const city = response.data.name;
			ctx.reply(`${city}: ${weatherDescription}, ${temperature} °C`);
		} catch (error) {
			console.error(error);
			ctx.reply('Error fetching weather data.');
		}
	}
});

bot.launch();
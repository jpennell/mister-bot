let Botkit = require('botkit');
const redis = require('botkit-storage-redis');

let redisStorage = redis({
  namespace: 'mister',
  url: process.env.REDIS_URL
});

let controller = Botkit.slackbot({
  storage: redisStorage
});

let app = controller.configureSlackApp({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: ['bot']
});

controller.setupWebserver(process.env.PORT, function (err, server) {
  controller
    .createHomepageEndpoint(controller.webserver)
    .createOauthEndpoints(controller.webserver)
    .createWebhookEndpoints(controller.webserver);
});

controller.on('direct_mention', function (bot, message) {
  bot.reply(message, 'meow :cat:');
});

controller.on('direct_message', function (bot, message) {
  bot.reply(message, 'meow :cat:');
});

controller.on('mention', function (bot, message) {
  bot.reply(message, 'meow :cat:');
});

controller.on('create_bot', rtm);
controller.on('rtm_close', rtm);

function rtm(bot) {
  bot.startRTM((err) => {
    if (err) {
      console.error(err);
      return setTimeout(() => rtm(bot), 60000);
    }
  });
}

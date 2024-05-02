const TelegramBot = require('node-telegram-bot-api');

const token = '6980779067:AAHBMgBXXdLy0PjIGgH2anjGZxgo4kQaldE';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, октагон!');
});

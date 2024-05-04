const TelegramBot = require('node-telegram-bot-api');

const token = '6980779067:AAHBMgBXXdLy0PjIGgH2anjGZxgo4kQaldE';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, октагон!');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
    Список доступных команд:
    /site - ссылка на сайт октагона
    /creator - информация о создателе
    `;
    bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    const siteUrl = 'https://students.forus.ru';
    bot.sendMessage(chatId, `Ссылка на сайт октагона: ${siteUrl}`);
});

bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    const creatorInfo = 'Жуков Никита Юрьевич';
    bot.sendMessage(chatId, `Создатель бота: ${creatorInfo}`);
});

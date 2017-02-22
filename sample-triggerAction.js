const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, [
    (session, args, next) => {
        const card = new builder.ThumbnailCard(session);
        card.buttons([
            new builder.CardAction(session).title('Add a number').value('Add').type('imBack'),
            new builder.CardAction(session).title('Get help').value('Help').type('imBack'),
        ]).text(`What would you like to do?`);

        const message = new builder.Message(session);
        message.addAttachment(card);

        session.send(`Hi there! I'm the calculator bot! I can add numbers for you.`);
        // we can end the conversation here
        // the buttons will provide the appropriate message
        session.endConversation(message);
    },
]);

bot.dialog('AddNumber', [
    (session, args, next) => {
        session.endConversation(`This is the AddNumber dialog`);
    },
]).triggerAction({matches: /^add$/i});

module.exports = bot;
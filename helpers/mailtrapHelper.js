const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

const MAILTRAP_USERNAME = 'd5e1bf4f9f5ea7';
const MAILTRAP_PASSWORD = 'bfa355e505f80b';
const MAILTRAP_HOST = 'sandbox.smtp.mailtrap.io'; // e.g., smtp.mailtrap.io
const MAILTRAP_PORT = 2525; // IMAP port

async function getResetLinkFromMailtrap(email) {
    const config = {
        imap: {
            user: MAILTRAP_USERNAME,
            password: MAILTRAP_PASSWORD,
            host: MAILTRAP_HOST,
            port: MAILTRAP_PORT,
            authTimeout: 3000
        }
    };

    try {
        console.log('Connecting to IMAP server...');
        const connection = await imaps.connect({ imap: config.imap });
        await connection.openBox('INBOX');
        console.log('Connected and inbox opened.');

        const searchCriteria = ['UNSEEN', ['TO', email]];
        const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'] };

        const messages = await connection.search(searchCriteria, fetchOptions);

        if (messages.length === 0) {
            throw new Error('Reset password email not found');
        }

        const message = messages[0];
        const all = message.parts.find(part => part.which === 'TEXT').body;
        const parsed = await simpleParser(all);

        const resetLink = extractResetLinkFromEmailBody(parsed.html);

        await connection.end();
        return resetLink;
    } catch (error) {
        console.error('Error connecting to IMAP server:', error);
        throw error;
    }
}

function extractResetLinkFromEmailBody(emailBody) {
    const resetLinkMatch = emailBody.match(/href="(https:\/\/brands.gaem\.io\/reset-password\/[a-zA-Z0-9-_]+)"/);
    if (!resetLinkMatch) {
        throw new Error('Reset link not found in email body');
    }
    return resetLinkMatch[1];
}

module.exports = { getResetLinkFromMailtrap };
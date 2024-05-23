// pop3Helper.js
const POP3Client = require('node-pop3');
const simpleParser = require('mailparser').simpleParser;

const POP3_HOST = 'pop3.mailtrap.io';
const POP3_PORT = 9950;  // or 995 for SSL
const POP3_USER = 'd5e1bf4f9f5ea7';
const POP3_PASS = 'bfa355e505f80b';

async function getEmails() {
    return new Promise((resolve, reject) => {
        const client = new POP3Client({
            hostname: POP3_HOST,
            port: POP3_PORT,
            username: POP3_USER,
            password: POP3_PASS,
            tls: false // set to true if your server supports SSL/TLS
        });

        client.connect();

        client.on('connect', () => {
            console.log('Connected to POP3 server');
            client.login();
        });

        client.on('login', (status, rawdata) => {
            if (status) {
                client.list();
            } else {
                console.error('Login failed:', rawdata);
                reject(new Error('Login failed'));
            }
        });

        client.on('list', (status, msgcount, data, rawdata) => {
            if (status && msgcount > 0) {
                client.retr(1);  // Retrieve the first message
            } else {
                console.error('No messages:', rawdata);
                reject(new Error('No messages'));
            }
        });

        client.on('retr', async (status, msgnumber, data, rawdata) => {
            if (status) {
                const parsed = await simpleParser(data.join('\n'));
                resolve(parsed);
            } else {
                console.error('Retrieve failed:', rawdata);
                reject(new Error('Retrieve failed'));
            }
            client.quit();
        });

        client.on('quit', (status, rawdata) => {
            if (status) {
                console.log('Connection closed');
            } else {
                console.error('Quit failed:', rawdata);
            }
        });

        client.on('error', (err) => {
            console.error('POP3 error:', err);
            reject(err);
        });
    });
}

async function getResetLinkFromEmail() {
    try {
        const email = await getEmails();
        const resetLinkMatch = email.html.match(/href="(https:\/\/brands.gaem\.io\/reset-password\/[a-zA-Z0-9-_]+)"/);
        if (!resetLinkMatch) throw new Error('Reset link not found in email body');
        return resetLinkMatch[1];
    } catch (error) {
        console.error('Error retrieving reset link:', error);
        throw error;
    }
}

module.exports = { getResetLinkFromEmail };
import app from './app';
import Connection from './database/Connection';

async function main() {
    try {
        if (process.env.NODE_ENV !== 'production') {
            require('dotenv').config();
            console.log('Development Mode');
        }

        const conn = new Connection();

        await conn.createConnection();

        app.start();

    } catch (error) {
        console.error('Error!!', error);
    }
}

main();
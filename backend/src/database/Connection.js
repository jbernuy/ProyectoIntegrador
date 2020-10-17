import mongoose from 'mongoose'

export default class Connection {

    static connection;

    constructor() {}

    static getConnection() {
        if (!Connection.connection) {
            Connection.connection = new Connection();
        }
        return Connection.connection;
    }

    async createConnection() {
        try {
            const bd = await mongoose.connect(process.env.MONGO_URI || '', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                poolSize: 4
            });
            if (!bd) {
                console.log('Could not connect to the db');
            }
            console.log('The DB is connected');
            this.db = bd;
        } catch (error) {
            console.log('DB err', error);
        }
    }

}
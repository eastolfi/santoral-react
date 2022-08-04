import { MongoClient, Db } from 'mongodb';

const token = Symbol('mongo-database');

let client: MongoClient = null;
let instance: MongoDatabase = null;

export class MongoDatabase {
    private db: Db;

    constructor(_token: Symbol) {
        if (_token !== token) {
            throw new Error('MongoDatabase class is a singleton. Please use MongoDatabase.instance instead.');
        }

        this.db = client.db();
    }

    static get instance(): MongoDatabase {
        if (instance === null) {
            instance = new MongoDatabase(token);
        }

        return instance;
    }

    static get db(): Db {
        return this.instance.db;
    }

    /**
     * Initialize the mongodb client and stablish a connection
     */
    static async init(): Promise<void> {
        client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

        try {
            await client.connect();
    
            await client.db().command({ ping: 1 });
            console.log('Connected successfully to the database');
        } catch (error) {
            console.log('Could not connect to the database')
            console.error(error);
        }
    }

    /**
     * Close the current connection to the database
     * 
     * @returns Promise<void>
     */
    static close(): Promise<void> {
        console.log('Disconnecting from database...');

        return client.close();
    }
}

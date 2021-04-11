import { Collection } from 'mongodb';

import { MongoDatabase } from '../shared/helpers/database';

export class DatabaseService {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    get collection(): Collection {
        return MongoDatabase.db.collection(this.collectionName);
    }
}

import { Collection, InsertOneWriteOpResult } from 'mongodb';

import { TimeService } from '../shared/services/time.service';
import { MongoDatabase } from '../shared/helpers/database';
import { AgendaEventDto } from '../shared/models/agenda-event';

class DBService {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    get collection(): Collection {
        return MongoDatabase.db.collection(this.collectionName);
    }
}

export class EventService extends DBService {
    constructor() {
        super('events');
    }

    /**
     * Search all events
     * 
     * @returns {Promise<AgendaEventDto>} The list of events
     */
    findAllEvents(): Promise<AgendaEventDto[]> {
        return this.collection.find().toArray();
    }

    /**
     * Search events for the given date
     * 
     * @param {string} date The date in format YYYY-MM-DD
     * 
     * @returns {Promise<AgendaEventDto>} The list of events
     */
    findEventsForDate(date: string): Promise<AgendaEventDto[]> {
        return this.collection.find({
            date: { "$eq": TimeService.toDbDate(date) }
        }).toArray();
    }

    /**
     * Insert a new event
     * 
     * @param {Event} event The information of the event
     * 
     * @returns {Promise<string>} The ID of the created event
     */
    addEvent(event: Omit<AgendaEventDto, '_id'>): Promise<string> {
        return this.collection.insertOne({
            title: 'From Service 2',
            content: 'Test',
            date: TimeService.toDbDate('2021-04-08')
        }).then((result: InsertOneWriteOpResult<AgendaEventDto>) => result.insertedId);
    }
}

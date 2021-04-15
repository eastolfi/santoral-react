import { DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject, InsertOneWriteOpResult, ObjectID } from 'mongodb';

import { TimeService } from '../shared/services/time.service';
import { AgendaEventDto } from '../shared/models/agenda-event';

import { DatabaseService } from './db.service';

export class EventService extends DatabaseService {
    constructor() {
        super('events');
    }

    /**
     * Search all events
     * 
     * @returns {Promise<AgendaEventDto>} The list of events
     */
    public findAllEvents(): Promise<AgendaEventDto[]> {
        return this.collection.find().toArray();
    }

    /**
     * Search events for the given date
     * 
     * @param {string} date The date in format YYYY-MM-DD
     * 
     * @returns {Promise<AgendaEventDto>} The list of events
     */
    public findEventsForDate(date: string): Promise<AgendaEventDto[]> {
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
    public addEvent(event: Omit<AgendaEventDto, '_id'>): Promise<string> {
        return this.collection.insertOne(event)
            .then((result: InsertOneWriteOpResult<AgendaEventDto>) => result.insertedId);
    }

    /**
     * Update an event
     * 
     * @param {Event} event The event to update
     * 
     * @returns {Promise<boolean>} Whether it update ok or not
     */
    public updateEvent(event: AgendaEventDto): Promise<boolean> {
        return this.collection.findOneAndUpdate({
            _id: new ObjectID(event._id)
        }, {
            $set: {
                title: event.title,
                content: event.content,
                date: event.date,
            }
        })
            .then((result: FindAndModifyWriteOpResultObject<AgendaEventDto>) => result.ok === 1);
    }

    /**
     * Delete an event
     * 
     * @param {string} eventId The event ID to delete
     * 
     * @returns {Promise<boolean>} Whether it deleted it ok or not
     */
    public deleteEvent(eventId: string): Promise<boolean> {
        return this.collection.deleteOne({ _id: new ObjectID(eventId) })
            .then((result: DeleteWriteOpResultObject) => {
                return result.result.ok === 1 && result.deletedCount !== 0
            });
    }

    /**
     * Delete several events
     * 
     * @param {string} eventsIds The events IDs to delete
     * 
     * @returns {Promise<boolean>} Whether it deleted them ok or not
     */
    public deleteEvents(eventsIds: string[]): Promise<boolean> {
        const ids = eventsIds.map((eventId: string) => new ObjectID(eventId));
        return this.collection.deleteMany({
            _id: { $in: ids }
        })
            .then((result: DeleteWriteOpResultObject) => {
                return result.result.ok === 1 && result.deletedCount !== 0
            });
    }
}

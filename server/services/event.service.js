const dayjs = require('dayjs');

const { MongoDatabase } = require('../helpers/database');

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_FORMAT_DB = 'YYYY-MM-DD[Z]';

function toDayjs(date /* string */) /* Dayjs */ {
    return dayjs(date, DATE_FORMAT);
}

function fromDayjs(date /* Dayjs */) /* string */ {
    return date.format(DATE_FORMAT);
}

function toDbDate(date /* string */) /* Date */ {
    return new Date(toDayjs(date).format(DATE_FORMAT_DB));
}

class DBService {
    constructor(collectionName /* string */) {
        this.collectionName /* string */ = collectionName;
    }

    get collection() /* MongoDb.Collection */ {
        return MongoDatabase.db.collection(this.collectionName);
    }
}

class EventService extends DBService {
    constructor() {
        super('events');
    }

    /**
     * Search events for the given date
     * 
     * @param {string} date The date in format YYYY-MM-DD
     * 
     * @returns {Promise<void>} The list of events
     */
    findEventsForDate(date /* string */) /* Promise<Event[]> */ {
        return this.collection.find({
            date: { "$eq": toDbDate(date) }
        }).toArray();
    }

    /**
     * Insert a new event
     * 
     * @param {Event} event The information of the event
     * 
     * @returns {Promise<string>} The ID of the created event
     */
    addEvent(event /* Event */) /* Promise<void> */ {
        return this.collection.insertOne({
            title: 'From Service 2',
            content: 'Test',
            date: toDbDate('2021-04-08')
        }).then((result /* InsertOneWriteOpResult */) => result.insertedId);
    }
}

module.exports = { EventService };

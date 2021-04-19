import { Router } from 'express';
import { AgendaEventDto, createAgendaEventDto } from '../shared/models/agenda-event';

import { EventService } from '../services/event.service';

export const EVENTS_ENDPOINT = '/events';

const eventService = new EventService();

const router = Router();

router.get('/search/all', (req, res) => {
    eventService.findAllEvents()
    .then((events: AgendaEventDto[]) => {
        res.send(events);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.get('/search/:date', (req, res) => {
    const { date } = req.params;

    eventService.findEventsForDate(date)
    .then((events: AgendaEventDto[]) => {
        res.send(events);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.post('/add', (req, res) => {
    const { event } = req.body;

    eventService.addEvent(createAgendaEventDto(event))
    .then((eventId: string) => {
        res.send({ id: eventId })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.put('/update/:eventId', (req, res) => {
    const { eventId } = req.params;
    const { event } = req.body;

    eventService.updateEvent({
        _id: eventId,
        ...createAgendaEventDto(event)
    })
    .then((updated: boolean) => {
        res.send({ updated })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.delete('/remove/:eventId', (req, res) => {
    const { eventId } = req.params;

    eventService.deleteEvent(eventId)
    .then((deleted: boolean) => {
        res.send({ deleted })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.patch('/remove/bulk', (req, res) => {
    const { eventsIds } = req.body;
    
    eventService.deleteEvents(eventsIds as string[])
    .then((deleted: boolean) => {
        res.send({ deleted })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

export default router;

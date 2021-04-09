import { Router } from 'express';
import { AgendaEventDto, createAgendaEventDto } from '../shared/models/agenda-event';

import { EventService } from '../services/event.service';

const eventService = new EventService();

const router = Router();

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

router.get('/add', (req, res) => {
    eventService.addEvent(createAgendaEventDto({
        title: 'From Service 2',
        content: 'Test',
        date: '2021-04-08'
    }))
    .then((eventId /* string */) => {
        res.send({ id: eventId })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
})

export default router;

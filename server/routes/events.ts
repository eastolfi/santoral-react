import { Router } from 'express';
import { AgendaEventDto, createAgendaEventDto } from '../shared/models/agenda-event';

import { EventService } from '../services/event.service';

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
    console.log(event.title)

    eventService.addEvent(createAgendaEventDto(event))
    .then((eventId: string) => {
        res.send({ id: eventId })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
})

export default router;

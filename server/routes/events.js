const { Router } = require('express');

const { EventService } = require('../services/event.service');

const eventService = new EventService();

const router = new Router();

router.get('/search/:date', (req, res) => {
    const { date } = req.params;

    eventService.findEventsForDate(date)
    .then((events /* Events[] */) => {
        res.send(events);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});

router.get('/add', (req, res) => {
    eventService.addEvent()
    .then((eventId /* string */) => {
        res.send({ id: eventId })
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
})

module.exports = router;


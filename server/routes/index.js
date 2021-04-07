const { Router } = require('express');

const router = new Router();

router.get('/', (_req, res) => {
    res.send('API Endpoint available')
});

router.use('/events', require('./events'));

module.exports = router;

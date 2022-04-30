const { Router } = require('express');
const router = Router();

const { renderGuestbook, renderNewMessage, createNewMessage,} = require('../controllers/entries.controller')

router.get('/', renderGuestbook);

router.get('/new-message', renderNewMessage);

router.post('/info', createNewMessage);



module.exports = router;
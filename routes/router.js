const express = require('express');
const {signUp} = require('../controllers/userController')
const router = express.Router();

router.get('/', (req, res) => { 
    res.send('Hello World!');
});
router.post('/register', signUp)


module.exports = router;
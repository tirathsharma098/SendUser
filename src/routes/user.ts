const express_user = require('express');
const router = express_user.Router();
const User = require('../controllers/user');

router.get('/', User.user);
router.get('/:id', User.user_one);
router.post('/', User.user_many);

module.exports = router;

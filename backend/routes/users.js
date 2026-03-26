const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const controller = require('../controllers/userController');

// Solo admin y boss pueden gestionar usuarios
router.get('/', auth, role(['admin', 'boss']), controller.getUsers);
router.post('/', auth, role(['admin', 'boss']), controller.createUser);
router.put('/:id', auth, role(['admin', 'boss']), controller.updateUser);
router.delete('/:id', auth, role(['admin', 'boss']), controller.deleteUser);

module.exports = router;
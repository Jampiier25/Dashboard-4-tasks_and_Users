const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const controller = require('../controllers/taskController');

router.get('/', auth, controller.getTasks);

// solo admin y boss crean tareas
router.post('/', auth, role(['admin', 'boss']), controller.createTask);

router.put('/:id', auth, controller.updateTask);

router.delete('/:id', auth, role(['admin', 'boss']), controller.deleteTask);

module.exports = router;
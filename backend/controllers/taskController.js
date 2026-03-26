const Task = require('../models/task');
const User = require('../models/user');

// Obtener tareas
exports.getTasks = async (req, res) => {
  try {
    if (req.user.role === 'employee') {
      const tasks = await Task.findAll({
        where: { assignedToId: req.user.id },
        include: [{ model: User, as: 'assignedTo', attributes: ['id', 'name'] }]
      });
      return res.json(tasks);
    }

    const tasks = await Task.findAll({
      include: [{ model: User, as: 'assignedTo', attributes: ['id', 'name'] }]
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear tarea (solo admin/boss deberían poder hacerlo desde rutas)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedToId } = req.body;

    if (!assignedToId) {
      return res.status(400).json({ error: 'Debe asignar la tarea a un usuario' });
    }

    const task = await Task.create({
      title,
      description,
      assignedToId,
      status: 'none'
    });

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar tarea (AQUÍ ESTÁ LA CLAVE 🔥)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ error: 'Not found' });

    // 🔒 EMPLEADO: solo puede editar SUS tareas
    if (req.user.role === 'employee') {
      if (task.assignedToId !== req.user.id) {
        return res.status(403).json({ error: 'No puedes editar esta tarea' });
      }

      // SOLO puede modificar status y notes
      const { status, notes } = req.body;

      await task.update({ status, notes });

      return res.json(task);
    }

    // 🔓 ADMIN / BOSS: pueden editar todo
    await task.update(req.body);

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });

    // 🔒 Solo admin y boss deberían poder eliminar (ya controlado en routes)
    await task.destroy();

    res.json({ message: 'Deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
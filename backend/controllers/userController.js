const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role']
  });
  res.json(users);
};

// Crear usuario (admin o boss)
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role
  });

  res.json(user);
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  await user.update(req.body);
  res.json(user);
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  await user.destroy();
  res.json({ message: 'User deleted' });
};
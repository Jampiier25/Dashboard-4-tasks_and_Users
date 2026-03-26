const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Hardcode token admin
const ADMIN_TOKEN = 'MI_TOKEN_ADMIN';
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token === ADMIN_TOKEN) next();
  else res.status(401).send('No autorizado');
}

// Servir carpeta admin con autenticación
app.use('/admin', adminAuth, express.static(path.join(__dirname, 'admin')));

// Ruta raíz
app.get('/', (req, res) => res.send('API funcionando 🚀'));

// Levantar servidor
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor corriendo en https://ubiquitous-goggles-pjp556jwj66gc7wgx-3001.app.github.dev');
  });
});
console.log(path.join(__dirname, 'admin'));
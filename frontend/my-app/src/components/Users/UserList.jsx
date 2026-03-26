import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/api';

export default function UserList() {
  const { user } = useContext(AuthContext); // usuario logueado con token
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const data = await getUsers(user.token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener los usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear usuario
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUser(form, user.token);
      setForm({ name: '', email: '', password: '', role: 'employee' });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error al crear usuario');
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;
    try {
      await deleteUser(id, user.token);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar usuario');
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {/* Formulario para crear usuario */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="employee">Employee</option>
          <option value="boss">Boss</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Crear</button>
      </form>

      {/* Lista de usuarios */}
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.role}) - {u.email}
            <button onClick={() => handleDelete(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
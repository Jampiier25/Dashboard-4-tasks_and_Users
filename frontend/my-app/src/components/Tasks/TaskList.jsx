import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getTasks, updateTask } from '../../api/api';

export default function TaskList() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks(user.token);
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleStatusChange = async (task, newStatus) => {
    await updateTask(task.id, { status: newStatus }, user.token);
    fetchTasks();
  };

  const handleNotesChange = async (task, notes) => {
    await updateTask(task.id, { notes }, user.token);
    fetchTasks();
  };

  const statusColor = (status) => {
    switch(status) {
      case 'none': return 'gray';
      case 'pending': return 'red';
      case 'in_progress': return 'orange';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div>
      <h2>Tareas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ border: `2px solid ${statusColor(task.status)}`, padding: '5px', margin: '5px' }}>
            <strong>{task.title}</strong> - {task.description}
            <br/>
            Estado:
            {['none','pending','in_progress','completed'].map(s => (
              <button
                key={s}
                style={{ backgroundColor: statusColor(s), margin: '0 3px', color: 'white' }}
                disabled={user.role === 'employee' && task.assignedToId !== user.id && s !== task.status}
                onClick={() => handleStatusChange(task, s)}
              >
                {s}
              </button>
            ))}
            <br/>
            <textarea
              placeholder="Notas"
              value={task.notes || ''}
              onChange={e => handleNotesChange(task, e.target.value)}
              disabled={user.role !== 'employee' && user.role !== 'boss'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
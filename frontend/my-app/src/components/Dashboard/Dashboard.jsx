import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import UserList from '../Users/UserList';
import TaskList from '../Tasks/TaskList';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h1>Bienvenido, {user.name} ({user.role})</h1>
      {(user.role === 'admin' || user.role === 'boss') && <UserList />}
      <TaskList />
    </div>
  );
}
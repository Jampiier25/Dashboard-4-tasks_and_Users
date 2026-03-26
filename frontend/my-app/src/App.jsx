import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

function AppContent() {
  const { user } = useContext(AuthContext);

  if (!user) return <Login />;

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
        <h1>Dashboard de Tareas</h1>
        <AppContent />
      </div>
    </AuthProvider>
  );
}
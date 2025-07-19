import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './assets/styles/main.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
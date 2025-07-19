const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="profile-section active">
      <div className="profile-header">
        <img src="https://via.placeholder.com/50" alt="Logo" className="profile-logo" />
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-info">
            <img 
              src={user.avatar || 'https://via.placeholder.com/80'} 
              alt="Profile" 
              className="profile-pic" 
            />
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
          </div>
          
          <ul className="nav-menu">
            <li className="nav-item"><a href="#" className="nav-link active">🏠 Dashboard</a></li>
            <li className="nav-item"><a href="#" className="nav-link">👤 Profile</a></li>
            <li className="nav-item"><a href="#" className="nav-link">✉ Messages</a></li>
            <li className="nav-item"><a href="#" className="nav-link">⚙ Settings</a></li>
          </ul>
        </div>
        
        <div className="main-content">
          <h2 className="content-title">Dashboard</h2>
          
          <div className="welcome-card">
            <h2>Welcome back, {user.name.split(' ')[0]}!</h2>
            <p>You have successfully logged in to your account.</p>
            <p>Last login: {new Date(user.lastLogin).toLocaleString()}</p>
          </div>
          
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">128</div>
              <div className="stat-label">Total Visits</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24</div>
              <div className="stat-label">New Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$1,240</div>
              <div className="stat-label">Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
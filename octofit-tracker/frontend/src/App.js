import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import octofitLogo from './assets/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function HomePage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img src={octofitLogo} alt="OctoFit Tracker" className="octofit-hero-logo mb-4" />
        <h1 className="display-5 fw-bold text-primary">OctoFit Tracker</h1>
        <p className="lead text-muted">Track activities, compete on leaderboards, and discover workouts with your team.</p>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-6 col-md-4 col-lg-2">
          <NavLink to="/users" className="text-decoration-none">
            <div className="card text-center shadow-sm border-0 h-100 home-card">
              <div className="card-body">
                <div className="display-6 mb-2">👥</div>
                <h6 className="card-title">Users</h6>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <NavLink to="/activities" className="text-decoration-none">
            <div className="card text-center shadow-sm border-0 h-100 home-card">
              <div className="card-body">
                <div className="display-6 mb-2">🏃</div>
                <h6 className="card-title">Activities</h6>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <NavLink to="/leaderboard" className="text-decoration-none">
            <div className="card text-center shadow-sm border-0 h-100 home-card">
              <div className="card-body">
                <div className="display-6 mb-2">🏆</div>
                <h6 className="card-title">Leaderboard</h6>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <NavLink to="/teams" className="text-decoration-none">
            <div className="card text-center shadow-sm border-0 h-100 home-card">
              <div className="card-body">
                <div className="display-6 mb-2">🤝</div>
                <h6 className="card-title">Teams</h6>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <NavLink to="/workouts" className="text-decoration-none">
            <div className="card text-center shadow-sm border-0 h-100 home-card">
              <div className="card-body">
                <div className="display-6 mb-2">💪</div>
                <h6 className="card-title">Workouts</h6>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar shadow">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src={octofitLogo} alt="OctoFit" width="32" height="32" />
            <span className="fw-bold">OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/activities" className="nav-link">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className="nav-link">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users" className="nav-link">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="octofit-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="octofit-footer text-center py-3">
        <small className="text-muted">&copy; 2026 OctoFit Tracker &mdash; Built with React &amp; Django REST Framework</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;

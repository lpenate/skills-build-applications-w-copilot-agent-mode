import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import octofitLogo from './assets/octofitapp-small.png';

function resolveApiBase() {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  if (hostname.includes('app.github.dev') && hostname.includes('-3000')) {
    return `${protocol}//${hostname.replace('-3000', '-8000')}/api`;
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://127.0.0.1:8000/api';
  }

  return `${protocol}//${hostname}:8000/api`;
}

const API_BASE = resolveApiBase();

const endpointConfig = [
  { key: 'users', label: 'Users' },
  { key: 'profiles', label: 'Profiles' },
  { key: 'activities', label: 'Activities' },
  { key: 'teams', label: 'Teams' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'workouts', label: 'Workouts' },
];

function useOctofitData(token) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError('');

        const responses = await Promise.all(
          endpointConfig.map(async ({ key }) => {
            const response = await fetch(`${API_BASE}/${key}/`, {
              headers: token ? { Authorization: `Token ${token}` } : {},
            });
            if (!response.ok) {
              throw new Error(`Request failed for ${key}: ${response.status}`);
            }
            const json = await response.json();
            return [key, json];
          })
        );

        if (!cancelled) {
          setData(Object.fromEntries(responses));
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError.message || 'Unable to load OctoFit data.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return { data, loading, error };
}

function SummaryCards({ data }) {
  return (
    <div className="row g-3 mb-4">
      {endpointConfig.map(({ key, label }) => (
        <div className="col-6 col-md-4 col-xl-2" key={key}>
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <div className="text-uppercase small text-muted">{label}</div>
              <div className="display-6 fw-semibold">{(data[key] || []).length}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardPage({ data, loading, error }) {
  const topEntries = useMemo(() => (data.leaderboard || []).slice(0, 5), [data.leaderboard]);
  const recentActivities = useMemo(() => (data.activities || []).slice(0, 5), [data.activities]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between mb-4 gap-3">
        <div>
          <h1 className="h3 mb-1">OctoFit Tracker</h1>
          <p className="text-muted mb-0">API base: {API_BASE}</p>
        </div>
        <img src={octofitLogo} alt="OctoFit" className="octofit-logo" />
      </div>

      {loading && <div className="alert alert-info">Loading OctoFit data...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <SummaryCards data={data} />

          <div className="row g-4">
            <div className="col-12 col-xl-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white fw-semibold">Top Leaderboard</div>
                <div className="table-responsive">
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Points</th>
                        <th scope="col">Weekly</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.user_id}</td>
                          <td>{entry.points}</td>
                          <td>{entry.weekly_points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white fw-semibold">Recent Activities</div>
                <div className="table-responsive">
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>{activity.activity_type}</td>
                          <td>{activity.duration_minutes} min</td>
                          <td>{activity.calories_burned}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container py-4">
      <h2 className="h4 mb-3">About OctoFit</h2>
      <p className="mb-2">OctoFit helps teams log activity, compare scores, and get workout suggestions.</p>
      <p className="text-muted mb-0">Frontend runs on port 3000 and backend API on port 8000.</p>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('alex');
  const [password, setPassword] = useState('OctoFit123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials.');
      }

      const json = await response.json();
      if (!json.token) {
        throw new Error('Token not returned by API.');
      }

      onLogin(json.token, username);
    } catch (loginError) {
      if (loginError instanceof TypeError) {
        setError(`Network error connecting to ${API_BASE}. Verify backend is running on port 8000.`);
      } else {
        setError(loginError.message || 'Unable to login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '520px' }}>
      <h2 className="h4 mb-3">Login</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input id="username" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('octofit_token') || '');
  const [authUser, setAuthUser] = useState(localStorage.getItem('octofit_user') || '');
  const { data, loading, error } = useOctofitData(authToken);

  const handleLogin = (token, username) => {
    localStorage.setItem('octofit_token', token);
    localStorage.setItem('octofit_user', username);
    setAuthToken(token);
    setAuthUser(username);
  };

  const handleLogout = async () => {
    try {
      if (authToken) {
        await fetch(`${API_BASE}/auth/logout/`, {
          method: 'POST',
          headers: { Authorization: `Token ${authToken}` },
        });
      }
    } finally {
      localStorage.removeItem('octofit_token');
      localStorage.removeItem('octofit_user');
      setAuthToken('');
      setAuthUser('');
    }
  };

  const isAuthenticated = Boolean(authToken);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">OctoFit</span>
          <div className="navbar-nav flex-row gap-3">
            <NavLink to="/" className="nav-link">Dashboard</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </div>
          <div className="d-flex align-items-center gap-2 text-white ms-3">
            {authUser ? <span className="small">{authUser}</span> : <span className="small">Guest</span>}
            <button type="button" className="btn btn-sm btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={(
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage data={data} loading={loading} error={error} />
            </ProtectedRoute>
          )}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

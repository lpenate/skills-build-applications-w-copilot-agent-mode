import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname.includes('app.github.dev')
    ? `${window.location.protocol}//${window.location.hostname.replace('-3000', '-8000')}/api`
    : 'http://127.0.0.1:8000/api');

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `${API_BASE}/workouts/`;
    console.log('Fetching workouts from:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log('Workouts data received:', json);
        const rows = json.results || json;
        setWorkouts(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="alert alert-info m-4">Loading workouts…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="bi bi-lightning me-2"></i>Workout Suggestions
      </h2>
      <div className="row g-4">
        {workouts.map((w) => (
          <div className="col-12 col-md-6 col-lg-4" key={w.id}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title">{w.title}</h5>
                <p className="card-text text-muted">{w.description || 'No description'}</p>
                <ul className="list-unstyled mb-0">
                  <li>
                    <span className={`badge ${
                      w.difficulty === 'beginner' ? 'bg-success' :
                      w.difficulty === 'intermediate' ? 'bg-warning text-dark' :
                      'bg-danger'
                    } me-2`}>
                      {w.difficulty}
                    </span>
                  </li>
                  <li className="mt-2">
                    <strong>{w.estimated_minutes}</strong> min estimated
                  </li>
                </ul>
              </div>
              <div className="card-footer text-muted small">
                For user: <span className="badge bg-secondary">{w.user_id}</span>
              </div>
            </div>
          </div>
        ))}
        {workouts.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No workouts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;

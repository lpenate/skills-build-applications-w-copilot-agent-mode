import React, { useEffect, useState } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching activities from:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log('Activities data received:', json);
        const rows = json.results || json;
        setActivities(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="alert alert-info m-4">Loading activities…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="bi bi-activity me-2"></i>Activities
      </h2>
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, idx) => (
                <tr key={a.id}>
                  <td>{idx + 1}</td>
                  <td><span className="badge bg-secondary">{a.user_id}</span></td>
                  <td>{a.activity_type}</td>
                  <td>{a.duration_minutes} min</td>
                  <td>{a.calories_burned} kcal</td>
                  <td>{a.performed_at ? new Date(a.performed_at).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
              {activities.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted">No activities found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;

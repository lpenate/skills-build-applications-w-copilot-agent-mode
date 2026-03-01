import React, { useEffect, useState } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching leaderboard from:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log('Leaderboard data received:', json);
        const rows = json.results || json;
        setEntries(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="alert alert-info m-4">Loading leaderboard…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="bi bi-trophy me-2"></i>Leaderboard
      </h2>
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Total Points</th>
                <th scope="col">Weekly Points</th>
              </tr>
            </thead>
            <tbody>
              {entries
                .sort((a, b) => b.points - a.points)
                .map((entry, idx) => (
                  <tr key={entry.id}>
                    <td>
                      {idx === 0 && <span className="badge bg-warning text-dark">🥇</span>}
                      {idx === 1 && <span className="badge bg-secondary">🥈</span>}
                      {idx === 2 && <span className="badge bg-info text-dark">🥉</span>}
                      {idx > 2 && <span className="badge bg-light text-dark">{idx + 1}</span>}
                    </td>
                    <td><span className="badge bg-secondary">{entry.user_id}</span></td>
                    <td><strong>{entry.points}</strong></td>
                    <td>{entry.weekly_points}</td>
                  </tr>
                ))}
              {entries.length === 0 && (
                <tr><td colSpan="4" className="text-center text-muted">No leaderboard entries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

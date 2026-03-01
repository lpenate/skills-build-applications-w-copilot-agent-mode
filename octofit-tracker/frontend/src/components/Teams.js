import React, { useEffect, useState } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching teams from:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log('Teams data received:', json);
        const rows = json.results || json;
        setTeams(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="alert alert-info m-4">Loading teams…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="bi bi-people me-2"></i>Teams
      </h2>
      <div className="row g-4">
        {teams.map((team) => (
          <div className="col-12 col-md-6" key={team.id}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-dark text-white">
                <h5 className="card-title mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{team.description || 'No description'}</p>
                <h6 className="mt-3">Members ({(team.member_ids || []).length})</h6>
                <ul className="list-group list-group-flush">
                  {(team.member_ids || []).map((memberId, idx) => (
                    <li className="list-group-item" key={idx}>
                      <span className="badge bg-secondary">{memberId}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer text-muted small">
                Created: {team.created_at ? new Date(team.created_at).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No teams found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;

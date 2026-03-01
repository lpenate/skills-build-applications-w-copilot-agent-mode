import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname.includes('app.github.dev')
    ? `${window.location.protocol}//${window.location.hostname.replace('-3000', '-8000')}/api`
    : 'http://127.0.0.1:8000/api');

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `${API_BASE}/users/`;
    console.log('Fetching users from:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log('Users data received:', json);
        const rows = json.results || json;
        setUsers(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="alert alert-info m-4">Loading users…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="bi bi-person me-2"></i>Users
      </h2>
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{user.username}</strong></td>
                  <td>{user.email || '—'}</td>
                  <td><code className="small">{user.id}</code></td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="4" className="text-center text-muted">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;

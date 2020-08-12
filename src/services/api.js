const API_ROOT = 'localhos'const API_ROOT = 'http://localhost:3001'
const token = () => localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: `Bearer ${token()}`
};

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({user: data})
  }).then(res => res.json());
}


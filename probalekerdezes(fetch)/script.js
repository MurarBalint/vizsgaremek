fetch('http://localhost:2069/users')
  .then(res => {
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  })
  .then(data => console.log('Adat:', data))
  .catch(err => console.error('Hiba:', err));
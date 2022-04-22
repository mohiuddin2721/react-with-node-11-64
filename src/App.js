import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email);
    const user = {name, email};

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', 
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const newUser = [...users, data];
      setUsers(newUser);
    })
  }

  return (
    <div className="App">
      <h1>Our own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' required/>
        <input type="email" name="email" placeholder='Email' required/>
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id}__Name: {user.name} __ Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

function User() {
const {userId} = useParams();
const [user, setUser] = useState({});

useEffect(() => {
  fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json() ).then((data) => setUser(data));
}, [userId])

  return (
      <h1>
          User - {userId}
          {user.first_name}
      </h1>
  )
}

export default User
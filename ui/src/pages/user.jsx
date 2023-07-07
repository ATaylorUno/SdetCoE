import { useParams } from 'react-router-dom'

async function User() {
const {userId} = useParams();

const response = await fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json() );


  return (
      <h1>
          User - {userId}
          {response.first_name}
      </h1>
  )
}

export default User
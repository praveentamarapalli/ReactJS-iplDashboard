// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails
  return (
    <li className="list-item">
      <Link to={`/team-matches/${id}`} className="link">
        <div className="list-items-container">
          <img src={teamImageUrl} alt={name} className="image-url" />
          <p className="card-heading">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default TeamCard

import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, teamImageUrl, id} = teamDetails
  return (
    <li className="team-card">
      <Link to={`/team-matches/${id}`} className="link-item">
        <img src={teamImageUrl} className="team-logo" alt={name} />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard

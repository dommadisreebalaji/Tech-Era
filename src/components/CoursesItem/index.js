import {Link} from 'react-router-dom'

import './index.css'

const CoursesItem = props => {
  const {eachItem} = props
  const {id, name, logoUrl} = eachItem
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-container">
        <img className="list-img" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesItem

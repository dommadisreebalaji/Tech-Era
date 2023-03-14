import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    courseDetailsList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchCourseCardData()
  }

  fetchCourseCardData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const newData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetailsList: newData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.fetchCourseCardData()
  }

  renderCourseCardDetails = () => {
    const {courseDetailsList} = this.state
    const {name, imageUrl, description} = courseDetailsList
    return (
      <div className="course-details-container">
        <div className="course-detail-card-container">
          <img className="course-details-img" src={imageUrl} alt={name} />
          <div className="card-info-container">
            <h1 className="card-heading">{name}</h1>
            <p className="card-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderPendingState = () => (
    <div className="pending-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureState = () => (
    <div className="pending-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We Cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseCardDetails()
      case apiStatusConstants.failure:
        return this.renderFailureState()
      case apiStatusConstants.inProgress:
        return this.renderPendingState()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-page-container">
        <Header />
        {this.renderSwitch()}
      </div>
    )
  }
}

export default CourseDetails

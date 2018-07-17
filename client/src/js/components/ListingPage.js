import React from 'react'
import linkedinLogo from '../../css/img/linkedin.png';

function ListingsPage(props) {
  return(
    <div>
      <h1 className="listing-title">Share</h1>
      <p className="listing-description">This will post your listing onto the social media platforms you have selected</p>
      <form className="listing-media-form">
        <div className="listing-media-box">
          <img className="listing-media-logo" src={linkedinLogo} alt="linkedin_logo" />
          <div className="listing-media-title-container">
            <h3 className="listing-media-title">Linked In</h3>
          </div>
          <div className="listing-media-switch-container">
            <label className="listing-media-switch">
              <input type="checkbox" />
              <span className="slider-round"></span>
            </label>
          </div>
        </div>
      </form> 
    </div>

  )
}

export default ListingsPage

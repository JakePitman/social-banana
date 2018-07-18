import React from 'react'
import linkedInLogo from '../../css/img/linkedIn.png'

function MediaBox(props) {
  return (
    <div className="listing-media-box">
        <img className="listing-media-logo" src={linkedInLogo} alt="linkedin_logo" />
        <div className="listing-media-title-container">
          <h3 className="listing-media-title">{props.media}</h3>
        </div>
        <div className="listing-media-switch-container">
          <label className="listing-media-switch">
            <input type="checkbox" />
            <span className="slider-round"></span>
          </label>
        </div>
    </div>
  )
}

export default MediaBox


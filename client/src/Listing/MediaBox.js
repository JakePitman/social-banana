import React from 'react';

function MediaBox(props) {
  return (
    <div className="listing-media-box">
      <img
        className="listing-media-logo"
        src={require('../assets/img/' + props.mediaLogo + '.png')}
        alt="linkedin_logo"
      />
      <div className="listing-media-title-container">
        <h3 className="listing-media-title">{props.mediaTitle}</h3>
      </div>
      <div className="listing-media-switch-container">
        <label className="listing-media-switch">
          {/* changes state in App.js */}
          <input
            id="linkedInToggleButton"
            onChange={props.handleToggle}
            type="checkbox"
            checked={props.isChecked ? 'checked' : ''}
          />
          <span className="slider-round" />
        </label>
      </div>
    </div>
  );
}

export default MediaBox;

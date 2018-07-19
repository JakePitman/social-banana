import React from 'react';
import MediaBox from './MediaBox';

function ListingsPage(props) {
  const toggleSettings = {
    //linkedIn: true,
    //facebook: false
    linkedIn: props.stateCopy.linkedInToggleStatus,
  };

  return (
    <div>
      <h1 className="listing-title">Share</h1>
      <p className="listing-description">
        This will post your listing onto the social media platforms you have
        selected
      </p>
      <form className="listing-media-form">
        {props.stateCopy.connectedToLinkedIn ? (
          <MediaBox
            handleToggle={props.handleToggle}
            mediaLogo="linkedin"
            mediaTitle="LinkedIn"
            isChecked={toggleSettings.linkedIn}
          />
        ) : (
          ''
        )}
        <input type="submit" />
      </form>
    </div>
  );
}

export default ListingsPage;

import React from 'react';
import MediaBox from './MediaBox';

function ListingsPage(props) {
  const toggleSettings = {
    //linkedIn: true,
    //facebook: false
<<<<<<< HEAD
    linkedIn: props.stateCopy.linkedInToggleStatus
=======
    linkedIn: props.stateCopy.linkedInToggleStatus,
>>>>>>> prepare for rebase
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
<<<<<<< HEAD
=======
        <input type="submit" />
>>>>>>> prepare for rebase
      </form>
    </div>
  );
}

export default ListingsPage;

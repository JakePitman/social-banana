import React from 'react'
import MediaBox from './MediaBox'

function ListingsPage(props) {
  const toggleSettings = {
    //linkedIn: true,
    //facebook: false
    linkedIn: props.currentUser.linkedIn.toggleStatus
  }

  return(
    <div>
      <h1 className="listing-title">Share</h1>
      <p className="listing-description">This will post your listing onto the social media platforms you have selected</p>
      <form className="listing-media-form">
        <MediaBox 
          currentUser={props.currentUser} 
          mediaLogo='linkedin' 
          mediaTitle="LinkedIn"
          isChecked={toggleSettings.linkedIn}
        />
      </form> 
    </div>

  )
}

export default ListingsPage

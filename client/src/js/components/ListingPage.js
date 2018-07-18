import React from 'react'
import MediaBox from './MediaBox'

function ListingsPage(props) {
  return(
    <div>
      <h1 className="listing-title">Share</h1>
      <p className="listing-description">This will post your listing onto the social media platforms you have selected</p>
      <form className="listing-media-form">
        <MediaBox mediaLogo='linkedin' mediaTitle="LinkedIn"/>
      </form> 
    </div>

  )
}

export default ListingsPage

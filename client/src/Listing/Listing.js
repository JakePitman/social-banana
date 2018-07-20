import React from 'react';
import MediaBox from './MediaBox';
import './listing.css';
import socialAPI from '../services/socialAPI';

function ListingsPage(props) {
  const toggleSettings = {
    linkedIn: props.stateCopy.linkedInToggleStatus
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toggleSettings.linkedIn) {
      console.log('LinkedIn not toggled');
    } else {
      const formData = {};
      const children = e.target.children;
      for (let i = 0; i < children.length; i++) {
        formData[`${children[i].name}`] = children[i].value;
      }
      //to get inspectiontime values (nested in div)
      const inspectionTimeValues = children[12].children;
      for (let i = 0; i < inspectionTimeValues.length; i++) {
        formData[`${inspectionTimeValues[i].name}`] =
          inspectionTimeValues[i].value;
      }
      //to get amenities values (nested in divs within a div)
      const amenitiesValues = children[14].children;
      for (let i = 0; i < amenitiesValues.length; i++) {
        formData[`${amenitiesValues[i].children[1].name}`] =
          amenitiesValues[i].children[1].value;
      }
      console.log(formData);
      socialAPI.shareListing(formData, props.stateCopy.authToken);
    }
  };

  return (
    <div>
      {/*---------------------FORM--------------------------*/}
      <form onSubmit={handleSubmit} className="listing-media-form">
        <h1 className="listing-title">List a Property</h1>
        {/*---PROPERTY-TYPE---*/}
        <label className="form-label">Property Type</label>
        <select name="property-type">
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="unit/apartment">Unit/ Apartment</option>
          <option value="acerage">Acerage</option>
          <option value="townhouse">Townhouse</option>
          <option value="rural">Rural</option>
          <option value="villa">Villa</option>
        </select>
        {/*---ADDRESS---*/}
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          autoComplete="street-address"
        />
        {/*---Description---*/}
        <label className="form-label">Description</label>
        <textarea
          type="text-field"
          name="description"
          placeholder="Description"
        />
        {/*---Price---*/}
        <label className="form-label">Price</label>
        <input type="number" name="price" placeholder="$" />
        {/*---LAND-SIZE---*/}
        <label className="form-label">Land Size</label>
        <input type="number" name="land-size" placeholder="Land Size (m2)" />
        {/*---INSPECTION-TIME---*/}
        <label className="form-label">Inspection Time</label>
        <div className="inspection-time">
          <input type="date" name="inspection-date" placeholder="Date" />
          <input type="time" name="inspection-time" placeholder="Time" />
        </div>
        {/*---AMENITIES---*/}
        <label className="form-label">Amenities</label>
        <div className="amenities">
          <div className="amenity">
            <h3 className="amenity-label">Bedrooms</h3>
            <input type="number" name="bedrooms" defaultValue="0" />
          </div>
          <div className="amenity">
            <h3 className="amenity-label">Bathrooms</h3>
            <input type="number" name="bathrooms" defaultValue="0" />
          </div>
          <div className="amenity">
            <h3 className="amenity-label">Car Spaces</h3>
            <input type="number" name="car-spaces" defaultValue="0" />
          </div>
        </div>
        {/*----------------------SHARE------------------------*/}
        <h1 className="listing-title">Share</h1>
        <p className="listing-description">
          This will post your listing onto the social media platforms you have
          selected
        </p>
        <div className="media-boxes">
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
          <button className="upload-listing-button" type="submit">
            Upload Listing
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingsPage;

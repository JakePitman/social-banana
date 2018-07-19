import React from 'react';
import MediaBox from './MediaBox';
import './listing.css';

function ListingsPage(props) {
  const toggleSettings = {
    linkedIn: props.stateCopy.linkedInToggleStatus,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const children = e.target.children;
    for (let i = 0; i < children.length; i++) {
      formData[`${children[i].name}`] = children[i].value;
    }
    console.log(formData);
  };

  return (
    <div>
      <h1 className="listing-title">Share</h1>
      <p className="listing-description">
        This will post your listing onto the social media platforms you have
        selected
      </p>
      <form onSubmit={handleSubmit} className="listing-media-form">
        <select name="property-type">
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="unit/apartment">Unit/ Apartment</option>
          <option value="acerage">Acerage</option>
          <option value="townhouse">Townhouse</option>
          <option value="rural">Rural</option>
          <option value="villa">Villa</option>
        </select>
        <input
          type="text"
          name="address"
          placeholder="Address"
          autoComplete="street-address"
        />
        <textarea
          type="text-field"
          name="description"
          placeholder="Description"
        />
        <input type="number" name="price" placeholder="$" />
        <input type="number" name="land-size" placeholder="Land Size (m2)" />
        <label>Inspection Time</label>
        <input type="date" name="inspection-date" placeholder="Date" />
        <input type="time" name="inspection-time" placeholder="Time" />
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

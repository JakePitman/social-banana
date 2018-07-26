import React from 'react';

import MediaBox from './MediaBox';
import './listing.css';

import socialAPI from '../services/socialAPI';
import { Redirect } from 'react-router-dom';

class ListingsPage extends React.Component {
  redirectHome = this.props.stateCopy.redirectHome;

  state = {
    propertyType: 'house',
    address: '',
    description: '',
    price: '',
    landSize: '',
    inspectionDate: '',
    inspectionTime: '',
    bedrooms: '0',
    bathrooms: '0',
    carSpaces: '0',
    redirect: false,
  };

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const toggleSettings = {
      linkedIn: this.props.stateCopy.linkedInToggleStatus,
      twitter: this.props.stateCopy.twitterToggleStatus,
    };
    const listing = this.state;
    console.log(this.props.stateCopy.authToken);
    const res = await socialAPI.shareListing(
      listing,
      this.props.stateCopy.authToken,
      toggleSettings
    );
    console.log(res.linkedInUrl);
    console.log(res.twitterUrl);

    //sets redirectHome to true in App.js
    this.setState({ redirect: true });
  };

  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to="/" />}
        {/*---------------------FORM--------------------------*/}
        <form onSubmit={this.handleSubmit} className="listing-media-form">
          <h1 className="listing-title">List a Property</h1>
          {/*---PROPERTY-TYPE---*/}
          <label className="form-label">Property Type</label>
          <select name="propertyType" onChange={this.handleChange}>
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
            onChange={this.handleChange}
            required
          />
          {/*---Description---*/}
          <label className="form-label">Description</label>
          <textarea
            type="text-field"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            required
          />
          {/*---Price---*/}
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            placeholder="$"
            onChange={this.handleChange}
            required
          />

          {/*---LAND-SIZE---*/}
          <label className="form-label">Land Size</label>
          <input
            type="number"
            name="landSize"
            placeholder="Land Size (m2)"
            onChange={this.handleChange}
          />
          {/*---INSPECTION-TIME---*/}
          <label className="form-label">Inspection Time</label>
          <div className="inspection-time">
            <input
              type="date"
              name="inspectionDate"
              placeholder="Date"
              onChange={this.handleChange}
            />
            <input
              type="time"
              name="inspectionTime"
              placeholder="Time"
              onChange={this.handleChange}
            />
          </div>
          {/*---AMENITIES---*/}
          <label className="form-label">Amenities</label>
          <div className="amenities">
            <div className="amenity">
              <h3 className="amenity-label">Bedrooms</h3>
              <input
                type="number"
                name="bedrooms"
                defaultValue="0"
                onChange={this.handleChange}
              />
            </div>
            <div className="amenity">
              <h3 className="amenity-label">Bathrooms</h3>
              <input
                type="number"
                name="bathrooms"
                defaultValue="0"
                onChange={this.handleChange}
              />
            </div>
            <div className="amenity">
              <h3 className="amenity-label">Car Spaces</h3>
              <input
                type="number"
                name="carSpaces"
                defaultValue="0"
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/*----------------------SHARE------------------------*/}
          <h1 className="listing-title">Share</h1>
          <p className="listing-description">
            This will post your listing onto the social media platforms you have
            selected
          </p>
          <div className="media-boxes">
            {/*Render linked in*/}
            {this.props.stateCopy.linkedInConnected ? (
              <MediaBox
                handleToggle={this.props.handleToggle}
                mediaLogo="linkedin"
                mediaTitle="LinkedIn"
                isChecked={this.props.stateCopy.linkedInToggleStatus}
              />
            ) : (
              ''
            )}
            {/*Render Twitter*/}
            {this.props.stateCopy.twitterConnected ? (
              <MediaBox
                handleToggle={this.props.handleToggle}
                mediaLogo="twitter"
                mediaTitle="Twitter"
                isChecked={this.props.stateCopy.twitterToggleStatus}
              />
            ) : (
              ''
            )}
          </div>
          <button className="upload-listing-button" type="submit">
            Upload Listing
          </button>
        </form>
      </div>
    );
  }
}

export default ListingsPage;

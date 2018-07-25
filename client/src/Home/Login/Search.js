import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';

import properties from './properties';

const KEYS_TO_FILTERS = ['user.state', 'suburb'];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  render() {
    const filteredProperties = properties.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div>
        <p>Logged in</p>
        <h1>Find a Property</h1>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredProperties.map((property) => {
          return (
            <div className="search">
              <div className="agent" key={property.id}>
                <div className="state">{property.user.state}</div>
                <div className="suburb">{property.suburb}</div>
                <div className="prop-img">{property.img}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
}
export default Search;
export { createFilter };

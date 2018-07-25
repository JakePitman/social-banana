import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';

import properties from './mails';

const KEYS_TO_FILTERS = ['user.name', 'user.state', 'suburb'];

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

        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredProperties.map((property) => {
          return (
            <div className="search">
              <div className="agent" key={property.id}>
                <div className="state">{property.user.state}</div>
                <div className="suburb">{property.suburb}</div>
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

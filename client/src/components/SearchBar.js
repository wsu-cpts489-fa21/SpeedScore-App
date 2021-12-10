import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends React.Component {

    searchFunction = (event) => {

        if (event.target.name == 'searchBox')
        {
            // If Operation is to 'write' in a search bar.
            this.props.getSearchedText(event.target.value);
        }
        else
        {
            // Operation is 'cancel'.
            document.getElementById("searchBoxForm").reset();
            this.props.getSearchedText("");
        }
    }

    render()
    {
        return(
            <>
                {/* Search Bar */}
                <button id="searchBoxCancelBtn" style={{background: 'none', color: 'white', border: 'none'}}
                    onClick={(event) => {this.searchFunction(event)}}><FontAwesomeIcon icon={faTimesCircle} />
                </button>
                &nbsp;
                <form id="searchBoxForm">
                    <input id="searchBox" className="form-control searchBar-open"
                        aria-label="Search Rounds" size="70"
                        type="search" placeholder="Search..."
                        name="searchBox"
                        onChange={(event) => {this.searchFunction(event)}}>
                    </input>
                </form>
            </>
        );
    }
}

export default SearchBar;
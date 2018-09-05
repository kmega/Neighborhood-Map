import React from 'react';
import './App.css';
// SearchOption component starts here.
const SearchOption = (props) => {
    const {
        places,
        query,
        toggle,
        showSearchBox
    } = props;
    return ( <
        nav id = 'nav' 
        className = {
            toggle
        } >
        { /* Icon from 'Font Awesome'. */ } <
        div className = 'fa fa-th-list'
        onClick = {
            showSearchBox
        }
        onKeyPress = {
            showSearchBox
        }
        role = 'button'
        tabIndex = {
            1
        }
        / >
        { /* Search box for searching purposes. */ } <
        input
        aria-labelledby = 'Searching Box'
        role = 'search'
        type = 'text'
        placeholder = 'Searching Box'
        className = 'searching-box'
        value = {
            query
        }
        onChange = {
            (e) => props.changeQuery(e.target.value)
        }
        tabIndex = {
            2
        }
        />
        { /* List of searchable shops with a simple filter. */ } <
        ul role = 'menu'
        className = 'place-list' > {
            // Like in GoogleMap.js filter names and place markers at their positions.
            places.filter(place => place.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
            .map(place => {
                return (
                    <
                    li role = 'menuitem'
                    tabIndex = {
                        3
                    }
                    className = 'place'
                    key = {
                        place.name
                    }
                    onClick = {
                        props.showShop.bind(this, place.name)
                    }
                    onKeyPress = {
                        props.showShop.bind(this, place.name)
                    } >
                    {
                        place.name
                    } <
                    /li>
                )
            })
        }
        <
        /ul>
        <
        /nav>
    );
}

export default SearchOption;

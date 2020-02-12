import React, { Component } from "react";
// Import GoogleMap component.
import GoogleMap from "./GoogleMap";
// Import SearchOption component.
import SearchOption from "./SearchOption";
import "./App.css";
// App component starts here.
class App extends Component {
  // State for different settings.
  state = {
    // Places that are known in Yelp Fusion API.
    places: [
      {
        name: "Lakou Cafe",
        position: {
          lat: 40.67200489142444,
          lng: -73.93059745430946
        }
      },
      {
        name: "Coffee Project New York",
        position: {
          lat: 40.72708904158265,
          lng: -73.98938208818436
        }
      },
      {
        name: "Bibble & Sip",
        position: {
          lat: 40.76290379577729,
          lng: -73.98533597588539
        }
      },
      {
        name: "Polo Caffe",
        position: {
          lat: 40.66620985314623,
          lng: -73.97861033678055
        }
      },
      {
        name: "Brooklyn Roasting Company",
        position: {
          lat: 40.70425544458103,
          lng: -73.98635789752007
        }
      },
      {
        name: "Absolute Coffee",
        position: {
          lat: 40.68819415095485,
          lng: -73.98763731122017
        }
      },
      {
        name: "Voyager Espresso",
        position: {
          lat: 40.70881201448755,
          lng: -74.00669708848
        }
      },
      {
        name: "Rebel Coffee",
        position: {
          lat: 40.73783173312936,
          lng: -74.00475785136223
        }
      },
      {
        name: "12 Corners Coffee",
        position: {
          lat: 40.713863322507656,
          lng: -73.99040803313255
        }
      },
      {
        name: "Bluestone Lane",
        position: {
          lat: 40.73579226932857,
          lng: -74.00089278817177
        }
      },
      {
        name: "dot & line",
        position: {
          lat: 40.684141611296226,
          lng: -73.98362472653389
        }
      },
      {
        name: "Blank Slate Tea",
        position: {
          lat: 40.745300087727664,
          lng: -73.98437574505806
        }
      },
      {
        name: "Laughing Man Coffee & Tea",
        position: {
          lat: 40.71727266255551,
          lng: -74.01012495160103
        }
      }
    ],
    // Markers array.
    markers: [],
    // Marker that has been clicked.
    clickedMarker: {},
    // Currently selected place.
    currentPlace: "",
    // Details returned from Yelp Fusion API.
    details: {},
    // User input.
    query: "",
    // Initally, I used jQuery to display searchOption, but ReactJs state is just better for this.
    toggle: "",
    // Error boolean.
    error: false
  };
  // On marker click take props and clicked marker and set their state.
  onMarkerClick = (props, marker) => {
    this.setState({
      markerShowing: true,
      currentPlace: props,
      clickedMarker: marker,
      details: {}
    });
    marker.setAnimation(1);
    // This method of feching Yelp Fusion requests is from https://forum.freecodecamp.org/t/authorization-http-header-for-yelp-fusion-api-access-token/140974/2.
    const accessToken =
      "vb8fpMmb4nk4mJ56e54L_meXsAmltZnPO4yWkCANzfxxzo5mlJD2tJ4XBU3LF-0yMEEnXLZH-QJM22W3Xa1RsE8a0bgFRF1kbPZoc6Z2pZxa7hkfj2yKEySqrhZkW3Yx";
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" +
        props.position.lat +
        "&longitude=" +
        props.position.lng,
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    )
      .then(res => res.json())
      .catch(() => this.setState({ error: true }))
      .then(data => {
        this.setState({
          details: data.businesses[0]
        });
      });
    setTimeout(() => {
      marker.setAnimation(0);
    }, 2000);
  };
  // If InfoWindow was closed or another was opened, deselect everything.
  defaultSetup = () => {
    this.setState({
      details: {},
      markerShowing: false,
      clickedMarker: 0
    });
  };
  // On clicking place that's on the list, call onMarkerClick with marker props and name.
  showShop = name => {
    this.onMarkerClick(
      this.state.markers.filter(marker => marker.props.name === name)[0].props,
      this.state.markers.filter(marker => marker.props.name === name)[0].marker
    );
  };
  // I wanted to update state based on previous marker and I got it working like this. I used https://forum.freecodecamp.org/t/react-prevstate/86495 to understand it's capabilities.
  markerId = id => {
    if (id !== 0) {
      this.setState(prevState => ({
        markers: [...prevState.markers, id]
      }));
    }
  };
  // Function for displaying and hiding search menu.
  showMenu = () => {
    this.state.toggle === ""
      ? this.setState({
          toggle: "open"
        })
      : this.setState({
          toggle: ""
        });
  };
  // On input change, set query to user input.
  changeQuery = query => {
    this.setState({
      query: query
    });
  };

  render() {
    const {
      toggle,
      query,
      clickedMarker,
      currentPlace,
      places,
      details,
      markerShowing,
      error
    } = this.state;
    return (
      <section role="application" tabIndex={1}>

        {/* I created SearchOption component to make this whole app more neat. */}
        <SearchOption
          toggle={toggle}
          showSearchBox={this.showMenu}
          query={query}
          changeQuery={this.changeQuery.bind(this)}
          places={places}
          showShop={this.showShop}
        />
        {/* Map starts here. */}
        <GoogleMap
          query={query}
          places={places}
          markerInfo={this.onMarkerClick}
          clickedMarker={clickedMarker}
          currentPlace={currentPlace}
          details={details}
          defaultSetup={this.defaultSetup}
          markerShowing={markerShowing}
          markerId={this.markerId}
          error={error}
        />
      </section>
    );
  }
}

export default App;

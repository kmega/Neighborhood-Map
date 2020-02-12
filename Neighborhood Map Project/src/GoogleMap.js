import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "./App.css";
// GoogleMap component starts here.
const GoogleMap = props => {
  const {
    google,
    places,
    query,
    clickedMarker,
    currentPlace,
    details,
    markerShowing,
    markerId,
    error
  } = props;
  return (
    // Map that is set lat, lng, zoom and style.
    <Map
      google={google}
      initialCenter={{
        lat: 40.71154990146508,
        lng: -73.96724191368207
      }}
      zoom={13}
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      {// Filter names and place markers at their positions.
      places
        .filter(
          place => place.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
        )
        .map(place => {
          return (
            <Marker
              key={place.name}
              name={place.name}
              position={place.position}
              onClick={props.markerInfo.bind(this)}
              ref={markerId}
              animation={google.maps.Animation.DROP}
            />
          );
        })}
      <InfoWindow
        visible={markerShowing}
        marker={clickedMarker}
        onClose={props.defaultSetup}
      >
        <section>
          <h1 className="name"> {currentPlace.name} </h1>
          {/* In App.js if there is an error then show div below. */}
          {error === true ? (
            <div tabIndex={2}>

              404 NOT FOUND - Please check your internet connection.
            </div>
          ) : // Method that is using Object.keys which stores array of keys as mentioned here https://javascript.info/keys-values-entries.
          Object.keys(details).length > 0 ? (
            // Place details.
            <section tabIndex={2}>
              <p tabIndex={2}>

                <strong> Address : </strong>
                {details.location.address1}
              </p>
              <p tabIndex={2}>

                <strong> City: </strong>
                {details.location.city}, {details.location.country}
              </p>
              <p tabIndex={2}>

                <strong> Rating: </strong>
                {details.rating}
              </p>
              <p tabIndex={2}>

                <strong> Reviews: </strong>
                {details.review_count}
              </p>
            </section>
          ) : (
            <strong> ... </strong>
          )}
        </section>
      </InfoWindow>
    </Map>
  );
};

// Default API wrapper for Google Map.
export default GoogleApiWrapper({
  apiKey: "AIzaSyDujre2Xf7QiP1NgyfN2_LEUTXMRduASww"
})(GoogleMap);

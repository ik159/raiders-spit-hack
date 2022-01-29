import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
//import  {features} from "../data/GeographicalData";
import axios from 'axios';
import { easeCubic } from 'd3-ease';
function LandingText() {

    const [viewport, setViewport] = useState({
        latitude: 26.3639,
        longitude: 86.0019,
        width: "100%",
        height: "500px",
        zoom: 10
    });

    const [city, setCity] = useState("");
    const zoomToCity = async (e) => {
        e.preventDefault();
        console.log(city);
        axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiaWsxNTkiLCJhIjoiY2t5eTN6amU5MGc2czJ3cWt5YjM4YnlhMyJ9.QX7dj7nsAZ5FAsy8G-YC7w`
        ).then((res) => {

            // Longitude
            console.log(res.data.features[0].geometry.coordinates[0]);

            // Latitude
            console.log(res.data.features[0].geometry.coordinates[1]);
            setViewport({
                ...viewport,
                longitude: res.data.features[0].geometry.coordinates[0],
                latitude: res.data.features[0].geometry.coordinates[1],
                zoom: 14,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: easeCubic
            });
        });
    }

    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {

            console.log("Latitude is :", position.coords.latitude);

            console.log("Longitude is :", position.coords.longitude);
            //setViewport({latitude: position.coords.latitude , longitude:position.coords.longitude })
        });

    }, []);



    return <>

        <div className="inner-text left">
            <h3>
                Select the best for you!
            </h3>
            <div className="user-box">
                <input
                    type="text"
                    name=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                />
                <label>Enter City</label>
            </div>
            <button className="hero-btn" onClick={zoomToCity}>Search</button>
        </div>

        <div className="inner-text right">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiaWsxNTkiLCJhIjoiY2t5eTN6amU5MGc2czJ3cWt5YjM4YnlhMyJ9.QX7dj7nsAZ5FAsy8G-YC7w'
                mapStyle="mapbox://styles/ik159/ckyyaj24k000014m6gdehg4gl"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {/* {features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <i className="fa fa-map-marker"></i>
            </button>
          </Marker>
        ))} */}

                {selectedPark ? (
                    <Popup
                        latitude={selectedPark.geometry.coordinates[1]}
                        longitude={selectedPark.geometry.coordinates[0]}
                        onClose={() => {
                            setSelectedPark(null);
                        }}
                    >
                        <div>
                            <h2>{selectedPark.properties.NAME}</h2>
                            <p>{selectedPark.properties.DESCRIPTIO}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    </>;
}

export default LandingText;

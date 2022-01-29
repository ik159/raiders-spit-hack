import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import { features } from "../data/CollegeData";
import axios from "axios";
import { easeCubic } from "d3-ease";
import { Container, Col, Row } from "react-bootstrap";
import CollegeCard from "./CollegeCard";
function calcCrow(lat1, lon1, lat2, lon2) {
  console.log(lat1);
  console.log(lat1);
  console.log(lat2);
  console.log(lon2);
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  //console.log(dLat);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  //console.log("insise funce ",d);
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

function LandingPage() {
  const [city, setCity] = useState("Mumbai");
  const [citylong, setcitylong] = useState(72.8777);
  const [citylang, setcitylang] = useState(19.0760);
  const [radius, setradius] = useState(20);
  const [cutoffrank, setcutoffrank] = useState(9569);
  const [rating, setrating] = useState(3.80);
  const [viewport, setViewport] = useState({
    latitude: citylang,
    longitude: citylong,
    width: "100%",
    height: "500px",
    zoom: 10,
  });
  const zoomToCity = async (e) => {
    e.preventDefault();
    console.log(city);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiaWsxNTkiLCJhIjoiY2t5eTN6amU5MGc2czJ3cWt5YjM4YnlhMyJ9.QX7dj7nsAZ5FAsy8G-YC7w`
      )
      .then((res) => {
        // Longitude
        console.log(res.data.features[0].geometry.coordinates[0]);
        setcitylong(res.data.features[0].geometry.coordinates[0]);
        // Latitude
        setcitylang(res.data.features[0].geometry.coordinates[1]);
        setViewport({
          ...viewport,
          longitude: res.data.features[0].geometry.coordinates[0],
          latitude: res.data.features[0].geometry.coordinates[1],
          zoom: 10,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic,
        });
      });
  };

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);

      console.log("Longitude is :", position.coords.longitude);
      //setViewport({latitude: position.coords.latitude , longitude:position.coords.longitude })
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <NavBar />
        <div className="text-box">
          <>
            <div className="inner-text left">
              <h3>Select the best for you!</h3>
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label>Enter City</label>
              </div>
              <button className="hero-btn" onClick={zoomToCity}>
                Search
              </button>
            </div>

            <div className="inner-text right">
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoiaWsxNTkiLCJhIjoiY2t5eTN6amU5MGc2czJ3cWt5YjM4YnlhMyJ9.QX7dj7nsAZ5FAsy8G-YC7w"
                mapStyle="mapbox://styles/ik159/ckyyaj24k000014m6gdehg4gl"
                onViewportChange={(viewport) => {
                  setViewport(viewport);
                }}
              >
                {features
                  .filter((u) => {
                    let d = calcCrow(
                      citylang,
                      citylong,
                      u.coordinates[0],
                      u.coordinates[1]
                    );
                    console.log(d);
                    if (radius > d && u.cutoffrank < cutoffrank && u.rating > rating) return u;
                  })
                  .map((college, ind) => {
                    return (
                      <Marker
                        key={ind}
                        latitude={college.coordinates[0]}
                        longitude={college.coordinates[1]}
                      >
                        <button
                          className="marker-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPark(college);
                          }}
                        >
                          <i className="fa fa-map-marker fa-gradient"></i>
                        </button>
                      </Marker>
                    );
                  })}

                {selectedPark ? (
                  <Popup
                    latitude={selectedPark.coordinates[0]}
                    longitude={selectedPark.coordinates[1]}
                    onClose={() => {
                      setSelectedPark(null);
                    }}
                  >
                    <div className="popup">
                      <p>{selectedPark.name}</p>
                      <p>{selectedPark.city}</p>
                    </div>
                  </Popup>
                ) : null}
              </ReactMapGL>
            </div>
          </>
        </div>
      </div>
      <div className="filters">
        <div className="user-box black-text">
          <input
            type="text"
            name=""
            value={radius}
            onChange={(e) => setradius(e.target.value)}
          />
          <label>Radius (km)</label>
        </div>
        <div className="user-box black-text">
          <input
            type="text"
            name=""
            value={cutoffrank}
            onChange={(e) => setcutoffrank(e.target.value)}
          />
          <label>Cutoff Rank</label>
        </div>
        <div className="user-box black-text">
          <input
            type="text"
            name=""
            value={rating}
            onChange={(e) => setrating(e.target.value)}
          />
          <label>Rating</label>
        </div>
        <button className="deadline apply-btn">Apply</button>
      </div>
      <CollegeList
        citylang={citylang}
        citylong={citylong}
        radius={radius}
        city={city}
      />
      <h1>Personal Recommendation For You</h1>
    </div>
  );
}

function CollegeList({ citylang, citylong, radius, city }) {
  return (
    <div className="college-list">
      <h1>{city} Colleges</h1>
      <Container>
        <Row>
          {features
            .filter((u) => {
              let d = calcCrow(
                citylang,
                citylong,
                u.coordinates[0],
                u.coordinates[1]
              );
              console.log(d);
              if (radius > d) return u;
            })
            .map((college, ind) => (
              <Col xs="4">
                <CollegeCard key={ind} college={college} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;

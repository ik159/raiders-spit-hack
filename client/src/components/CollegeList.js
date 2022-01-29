import React from "react";
import newyork from "../assets/newyork.png";
import { Container, Col, Row } from "react-bootstrap";
function CollegeList() {
  return (
    <div className="college-list">
      <h1>COLLEGE LIST </h1>
      <Container>
        <Row>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Col xs="4">
              <CollegeCard />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function CollegeCard() {
  return (
    <div class="card">
      <img class="card-img-top" src={newyork} alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title college-name">Manipal Institute of Tech</h5>
        <p class="card-text">Manipal, Karnataka</p>
        <p>
          <i class="fa fa-graduation-cap fa-gradient"></i> : Engineering
        </p>
        <p>
          <i class="fa fa-trophy  fa-gradient"></i> : 25
        </p>
        
        <p className="deadline">
           
          <i class="fa fa-calendar"></i> Deadline: 25th July
        </p>
        <a href="#" class="card-link">
        <i class="fa fa-bell"> Turn On</i>
        </a>
      </div>
    </div>
  );
}

export default CollegeList;

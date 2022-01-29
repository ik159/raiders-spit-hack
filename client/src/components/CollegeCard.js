import React from "react";
import newyork from "../assets/newyork.png";
import { features } from "../data/CollegeData";
import { useNavigate } from "react-router-dom";


function CollegeCard({college}) {
  let navigate = useNavigate();
  return (
    <div class="card" onClick={()=> navigate('college/26')}>
      <img class="card-img-top" src={newyork} alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title college-name">{college.name}</h5>
        <p class="card-text">{college.city}, {college.state}</p>
        <p>
          <i class="fa fa-graduation-cap fa-gradient"></i> : {college.category}
        </p>
        <p>
          <i class="fa fa-trophy  fa-gradient"></i> : {college.cutoff}
        </p>
        
        <p className="deadline">
           
          <i class="fa fa-calendar"></i> Deadline: {college.deadline}
        </p>
        <a href="#" class="card-link">
        <i class="fa fa-bell"> Turn On</i>
        </a>
      </div>
    </div>
  );
}

export default CollegeCard;

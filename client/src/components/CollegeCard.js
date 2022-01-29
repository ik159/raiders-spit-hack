import React from "react";
import newyork from "../assets/newyork.png";
import { features } from "../data/CollegeData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";



function CollegeCard({college}) {
  const auth = useAuth();

  let navigate = useNavigate();

  const subscribeNotif= async(e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if(!auth.user){
      toast.error("Please Login to Subscribe", { id: toastId });
      auth.setOpen(true);
    }
    try {
      const data ={name : college.name, email: auth.user.email}
      const res = await axios.post("http://localhost:5000/user/subscribe" ,data)
      if(res.data.success) toast.success(res.data.msg, { id: toastId });
    } catch (error) {
      //console.log(error.response);
      toast.error(error.response.data.msg, { id: toastId });
    }
  }
  return (
    <div class="card" >
      <img class="card-img-top" src={newyork} alt="Card image cap" onClick={()=> navigate('college/26')}/>
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
        <i class="fa fa-bell" onClick={subscribeNotif}> Subscribe</i>
        </a>
      </div>
    </div>
  );
}

export default CollegeCard;

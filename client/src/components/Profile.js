import React from 'react';
import  './Profile.scss';
import NavBar from './NavBar';
import { useAuth } from "../context/AuthContext";

function Profile() {
  const auth = useAuth();
  return <>
  <NavBar />
  <div class="container emp-profile">
  <form method="post">
      <div class="row">
          <div class="col-md-4">
              <div class="profile-img">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""/>
                  <div class="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="file"/>
                  </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="profile-head">
                          <h5>
                              {auth.user.name}
                          </h5>
                          <h6>
                              Web Developer and Designer
                          </h6>
                          <p class="proile-rating">MET Rank <span>{auth.user.rank}</span></p>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                      </li>
                      
                  </ul>
              </div>
          </div>
          <div class="col-md-2">
              <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
          </div>
      </div>
      <div class="row">
          <div class="col-md-4">
              <div class="profile-work">
                  <p>WORK LINK</p>
                  <a href="">github.com/ik159</a><br/>
                  <a href="">linked.in/ik159</a><br/>
                  
                  <p>Subscribed To:</p>
                  {auth.user.subscribedTo.map((i,ind) =>{
                      console.log(i);
                    return (
                      <><a href={`college/${i.collegeid}`}>{i.name}</a><br/></>
                    );
                  })}
                  
              </div>
          </div>
          <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                              <div class="row">
                                  <div class="col-md-6">
                                      <label>User Id</label>
                                  </div>
                                  <div class="col-md-6">
                                      <p>{auth.user._id}</p>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <label>Name</label>
                                  </div>
                                  <div class="col-md-6">
                                      <p>{auth.user.name}</p>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <label>Email</label>
                                  </div>
                                  <div class="col-md-6">
                                      <p>{auth.user.email}</p>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <label>City</label>
                                  </div>
                                  <div class="col-md-6">
                                      <p>{auth.user.city}</p>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <label>Profession</label>
                                  </div>
                                  <div class="col-md-6">
                                      <p>Student</p>
                                  </div>
                              </div>
                  </div>
                  
              </div>
          </div>
      </div>
  </form>           
</div></>;
}

export default Profile;
